import { Token, Currency, CurrencyAmount, Percent, TradeType } from '@dolomite-exchange/sdk-core'
import { Trade } from 'entities'
import JSBI from 'jsbi'
import invariant from 'tiny-invariant'

export enum AssetDenomination {
  Wei = 0,
  Par = 1,
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

function toHex(currencyAmount: CurrencyAmount<Currency>) {
  return `0x${currencyAmount.quotient.toString(16)}`
}

const ZERO_HEX = '0x0'

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
    const accountNumber = `0x${marginOptions.accountNumber.toString(16)}`
    const denomination = `0x${marginOptions.denomination.toString(16)}`
    const amountIn: string = toHex(trade.maximumAmountIn(tradeOptions.allowedSlippage))
    const amountOut: string = toHex(trade.minimumAmountOut(tradeOptions.allowedSlippage))
    const depositAmount: string = marginOptions.marginDeposit ? toHex(marginOptions.marginDeposit) : ZERO_HEX
    const path: string[] = trade.route.path.map((token: Token) => token.address)
    const deadline =
      'ttl' in tradeOptions
        ? `0x${(Math.floor(new Date().getTime() / 1000) + tradeOptions.ttl).toString(16)}`
        : `0x${tradeOptions.deadline.toString(16)}`

    const params = {
      accountNumber: accountNumber,
      denomination: denomination,
      amountIn: amountIn,
      amountOut: amountOut,
      tokenPath: path,
      depositToken: marginOptions.depositToken,
      isPositiveMarginDeposit: marginOptions.isPositiveMarginDeposit ? '0x1' : '0x0',
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
        args = isMargin ? [params, deadline] : [accountNumber, amountIn, amountOut, path, deadline]
        value = ZERO_HEX
        break
      case TradeType.EXACT_OUTPUT:
        methodName = isMargin ? 'swapTokensForExactTokensAndModifyPosition' : 'swapTokensForExactTokens'
        args = isMargin ? [params, deadline] : [accountNumber, amountIn, amountOut, path, deadline]
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
