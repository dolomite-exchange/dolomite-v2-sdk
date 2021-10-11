import { Token, Currency, CurrencyAmount, Percent, TradeType } from '@dolomite-exchange/sdk-core'
import { Trade } from 'entities'
import JSBI from 'jsbi'
import invariant from 'tiny-invariant'

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
  accountNumber: JSBI
  /**
   * The type of values that are being passed through for swapping, excluding the margin deposit
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
  depositToken: string | undefined
  /**
   * If positive, the amount to deposited into `accountNumber` or if negative, the amount to be withdrawn.
   */
  isPositiveMarginDeposit: boolean | undefined
  /**
   * The amount to be deposited or withdrawn from/to `accountNumber` depending on `isPositiveMarginDeposit`
   */
  marginDeposit: CurrencyAmount<Currency> | undefined
}

export interface ModifyPositionParams {
  accountNumber: string
  amountIn: AssetAmount
  amountOut: AssetAmount
  tokenPath: string[]
  depositToken: string
  isPositiveMarginDeposit: boolean
  marginDeposit: string
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
   * How long the swap is valid until it expires, in seconds.
   * This will be used to produce a `deadline` parameter which is computed from when the swap call parameters
   * are generated.
   */
  ttl: number
  /**
   * The account that should receive the output of the swap.
   */
  recipient: string

  /**
   * Whether any of the tokens in the path are fee on transfer tokens, which should be handled with special methods
   */
  feeOnTransfer?: boolean
}

export interface TradeOptionsDeadline extends Omit<TradeOptions, 'ttl'> {
  /**
   * When the transaction expires.
   * This is an atlernate to specifying the ttl, for when you do not want to use local time.
   */
  deadline: number
}

/**
 * The parameters to use in the call to the Uniswap V2 Router to execute a trade.
 */
export interface SwapParameters {
  /**
   * The method to call on the Uniswap V2 Router.
   */
  methodName: string
  /**
   * The arguments to pass to the method, all hex encoded.
   */
  args: (string | string[] | object)[]
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
 * Represents the Uniswap V2 Router, and has static methods for helping execute trades.
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
  public static swapCallParameters(
    trade: Trade<Currency, Currency, TradeType>,
    tradeOptions: TradeOptions | TradeOptionsDeadline,
    marginOptions: MarginOptions
  ): SwapParameters {
    const accountNumber = toHex(marginOptions.accountNumber)
    const amountIn: AssetAmount = {
      sign: marginOptions.isAmountInPositive,
      denomination: toHex(marginOptions.denomination),
      ref: toHex(AssetReference.Delta),
      value: toHex(trade.maximumAmountIn(tradeOptions.allowedSlippage)),
    }
    const amountOut: AssetAmount = {
      sign: marginOptions.isAmountOutPositive,
      denomination: toHex(marginOptions.denomination),
      ref: toHex(AssetReference.Delta),
      value: toHex(trade.minimumAmountOut(tradeOptions.allowedSlippage))
    }
    const depositAmount = toHex(marginOptions.marginDeposit)
    const path: string[] = trade.route.path.map((token: Token) => token.address)
    const deadline =
      'ttl' in tradeOptions
        ? toHex(Math.floor(new Date().getTime() / 1000) + tradeOptions.ttl)
        : toHex(tradeOptions.deadline)

    const params: ModifyPositionParams = {
      accountNumber: accountNumber,
      amountIn: amountIn,
      amountOut: amountOut,
      tokenPath: path,
      depositToken: marginOptions.depositToken ?? '0x0000000000000000000000000000000000000000',
      isPositiveMarginDeposit: marginOptions.isPositiveMarginDeposit ?? false,
      marginDeposit: depositAmount
    }

    const ZERO = JSBI.BigInt('0')
    const depositTokenBigNumber = marginOptions.depositToken ? JSBI.BigInt(marginOptions.depositToken) : undefined
    const isMargin = depositTokenBigNumber && JSBI.notEqual(depositTokenBigNumber, ZERO)
    if (isMargin) {
      invariant(typeof marginOptions.isPositiveMarginDeposit !== 'undefined', 'marginOptions.isPositiveMarginDeposit')
      invariant(typeof marginOptions.marginDeposit !== 'undefined', 'marginOptions.marginDeposit')
    }

    let methodName: string
    let args: (string | string[] | object)[]
    let value: string
    switch (trade.tradeType) {
      case TradeType.EXACT_INPUT:
        methodName = isMargin ? 'swapExactTokensForTokensAndModifyPosition' : 'swapExactTokensForTokens'
        args = isMargin ? [params, deadline] : [accountNumber, amountIn.value, amountOut.value, path, deadline]
        value = ZERO_HEX
        break
      case TradeType.EXACT_OUTPUT:
        methodName = isMargin ? 'swapTokensForExactTokensAndModifyPosition' : 'swapTokensForExactTokens'
        args = isMargin ? [params, deadline] : [accountNumber, amountIn.value, amountOut.value, path, deadline]
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
