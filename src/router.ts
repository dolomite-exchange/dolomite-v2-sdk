import { Currency, CurrencyAmount, Percent, Token, TradeType } from '@dolomite-exchange/sdk-core'
import { Trade } from 'entities'
import JSBI from 'jsbi'
import invariant from 'tiny-invariant'
// noinspection ES6PreferShortImport
import { BalanceCheckFlag } from './constants'

export enum AssetDenomination {
  Wei = 0,
  Par = 1
}

export enum AssetReference {
  Delta = 0
}

export interface AssetAmount {
  sign: boolean
  denomination: string
  ref: string
  value: string
}

/**
 * Options for opening / modifying a margin position / account
 */
export interface MarginOptions {
  /**
   * The account number from which the trade will take place.
   */
  tradeAccountNumber: JSBI
  /**
   * The account number for transferring collateral in/out of the position.
   */
  otherAccountNumber: JSBI
  /**
   * The type of values that are being passed through for trading, excluding the margin deposit.
   */
  denomination: AssetDenomination
  /**
   * True if the currency represented by amountIn for the trade has a positive balance in the user's margin account.
   * False if the balance is negative
   */
  isAmountInPositive: boolean
  /**
   * True if the currency represented by amountOut for the trade has a positive balance in the user's margin account.
   * False if the balance is negative
   */
  isAmountOutPositive: boolean
  /**
   * The deposit token that will be taken from account number 0 or moved back to account 0 after the trade
   */
  marginTransferToken: string | undefined
  /**
   * True to deposit from otherAccountNumber into tradeAccountNumber or false to withdraw from tradeAccountNumber into
   * otherAccountNumber.
   */
  isDepositIntoTradeAccount: boolean | undefined
  /**
   * The amount to be deposited or withdrawn from/to `accountNumber` depending on `isPositiveMarginDeposit`
   */
  marginTransferWei: CurrencyAmount<Currency> | undefined
  /**
   * The number of seconds until the position expires. 3600 equals one hour.
   */
  expiryTimeDelta: number
}

export interface ModifyPositionParams {
  tradeAccountNumber: string // used for executing the trade
  otherAccountNumber: string // used for transferring collateral in/out of the position
  amountIn: AssetAmount
  amountOut: AssetAmount
  tokenPath: string[]
  marginTransferToken: string
  isDepositIntoTradeAccount: boolean
  marginTransferWei: string
  expiryTimeDelta: string
  balanceCheckFlag: number
}

/**
 * Options for producing the arguments to send call to the router.
 */
export interface TradeOptions {
  /**
   * How much the execution price is allowed to move unfavorably from the trade execution price.
   */
  allowedSlippage: Percent
  /**
   * How long the trade is valid until it expires, in seconds.
   * This will be used to produce a `deadline` parameter which is computed from when the trade call parameters
   * are generated.
   */
  ttl: number
  /**
   * Whether to check if the user's balance is >= 0 after the trade settles. Use `TradeAccount` to check the trade
   * account for spot trades. For margin trades, `TradeAccount` checks the margin account and `OtherAccount` checks the
   * funding account (typically the spot account).
   */
  balanceCheckFlag: BalanceCheckFlag
}

export interface TradeOptionsDeadline extends Omit<TradeOptions, 'ttl'> {
  /**
   * When the transaction expires.
   * This is an atlernate to specifying the ttl, for when you do not want to use local time.
   */
  deadline: number
}

/**
 * The parameters to use in the call to the DolomiteAmmRouterV1Proxy to execute a trade.
 */
export interface ContractCallParameters {
  /**
   * The method to call on the DolomiteAmmRouterV1Proxy.
   */
  methodName: string
  /**
   * The arguments to pass to the method, all hex encoded.
   */
  args: (number | string | string[] | object)[]
  /**
   * The amount of wei to send in hex.
   */
  value: string
}

const ZERO_HEX = '0x0'

function toHex(value?: JSBI | CurrencyAmount<Currency> | number): string {
  if (value instanceof JSBI) {
    return `0x${value.toString(16)}`
  } else if (value instanceof CurrencyAmount) {
    return `0x${value.quotient.toString(16)}`
  } else if (typeof value === 'number') {
    return `0x${value.toString(16)}`
  } else {
    return ZERO_HEX
  }
}

/**
 * Represents the DolomiteAmmRouterV1Proxy, and has static methods for helping execute trades.
 */
export abstract class Router {
  // noinspection JSUnusedLocalSymbols
  /**
   * Cannot be constructed.
   */
  private constructor() {}

  /**
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
   * @param trade to produce call parameters for
   * @param tradeOptions options for the call parameters
   * @param marginOptions options for modifying a potential margin position
   */
  public static tradeCallParameters(
    trade: Trade<Currency, Currency, TradeType>,
    tradeOptions: TradeOptions | TradeOptionsDeadline,
    marginOptions: MarginOptions
  ): ContractCallParameters {
    const tradeAccountNumber = toHex(marginOptions.tradeAccountNumber)
    const otherAccountNumber = toHex(marginOptions.otherAccountNumber)
    const amountIn: AssetAmount = {
      sign: marginOptions.isAmountInPositive,
      denomination: toHex(marginOptions.denomination),
      ref: toHex(AssetReference.Delta),
      value: toHex(trade.maximumAmountIn(tradeOptions.allowedSlippage))
    }
    const amountOut: AssetAmount = {
      sign: marginOptions.isAmountOutPositive,
      denomination: toHex(marginOptions.denomination),
      ref: toHex(AssetReference.Delta),
      value: toHex(trade.minimumAmountOut(tradeOptions.allowedSlippage))
    }
    const marginTransferWei = toHex(marginOptions.marginTransferWei)
    const expiryTimeDelta = toHex(marginOptions.expiryTimeDelta)
    const path: string[] = trade.route.path.map((token: Token) => token.address)
    const deadline =
      'ttl' in tradeOptions
        ? toHex(Math.floor(new Date().getTime() / 1000) + tradeOptions.ttl)
        : toHex(tradeOptions.deadline)

    const params: ModifyPositionParams = {
      tradeAccountNumber: tradeAccountNumber,
      otherAccountNumber: otherAccountNumber,
      amountIn: amountIn,
      amountOut: amountOut,
      tokenPath: path,
      marginTransferToken: marginOptions.marginTransferToken ?? '0x0000000000000000000000000000000000000000',
      isDepositIntoTradeAccount: marginOptions.isDepositIntoTradeAccount ?? false,
      marginTransferWei: marginTransferWei,
      expiryTimeDelta: expiryTimeDelta,
      balanceCheckFlag: tradeOptions.balanceCheckFlag
    }

    const ZERO = JSBI.BigInt('0')
    const depositTokenBigNumber = marginOptions.marginTransferToken
      ? JSBI.BigInt(marginOptions.marginTransferToken)
      : undefined
    const isMargin = depositTokenBigNumber && JSBI.notEqual(depositTokenBigNumber, ZERO)
    if (isMargin) {
      invariant(typeof marginOptions.isDepositIntoTradeAccount !== 'undefined', 'marginOptions.isPositiveMarginDeposit')
      invariant(typeof marginOptions.marginTransferWei !== 'undefined', 'marginOptions.marginDeposit')
    }

    let methodName: string
    let args: (number | string | string[] | object)[]
    let value: string
    switch (trade.tradeType) {
      case TradeType.EXACT_INPUT:
        methodName = isMargin ? 'swapExactTokensForTokensAndModifyPosition' : 'swapExactTokensForTokens'
        args = isMargin
          ? [params, deadline]
          : [tradeAccountNumber, amountIn.value, amountOut.value, path, deadline, tradeOptions.balanceCheckFlag]
        value = ZERO_HEX
        break
      case TradeType.EXACT_OUTPUT:
        methodName = isMargin ? 'swapTokensForExactTokensAndModifyPosition' : 'swapTokensForExactTokens'
        args = isMargin
          ? [params, deadline]
          : [tradeAccountNumber, amountIn.value, amountOut.value, path, deadline, tradeOptions.balanceCheckFlag]
        value = ZERO_HEX
        break
    }
    return {
      methodName,
      args,
      value
    }
  }
}
