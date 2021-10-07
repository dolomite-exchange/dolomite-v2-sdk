// noinspection ES6PreferShortImport

import JSBI from 'jsbi'
import {Pair, Route, Trade} from './entities'
import {AssetDenomination, MarginOptions, Router} from './router'
import invariant from 'tiny-invariant'
import {CurrencyAmount, Percent, Token, WETH} from '@dolomite-exchange/sdk-core'

function checkDeadline(deadline: string[] | string | object): void {
  expect(typeof deadline).toBe('string')
  invariant(typeof deadline === 'string')
  // less than 5 seconds on the deadline
  expect(new Date().getTime() / 1000 - parseInt(deadline)).toBeLessThanOrEqual(5)
}

describe('Router', () => {
  const ZERO = JSBI.BigInt('0')
  const weth = WETH[1]
  const token0 = new Token(1, '0x0000000000000000000000000000000000000001', 18, 't0')
  const token1 = new Token(1, '0x0000000000000000000000000000000000000002', 18, 't1')

  const pair_0_1 = new Pair(
    CurrencyAmount.fromRawAmount(token0, JSBI.BigInt(1000)),
    CurrencyAmount.fromRawAmount(token1, JSBI.BigInt(1000))
  )

  const pair_weth_0 = new Pair(CurrencyAmount.fromRawAmount(weth, '1000'), CurrencyAmount.fromRawAmount(token0, '1000'))

  const defaultMarginOptions: MarginOptions = {
    accountNumber: ZERO,
    denomination: AssetDenomination.Par,
    depositToken: undefined,
    isPositiveMarginDeposit: undefined,
    marginDeposit: undefined
  }

  const marginOptions: MarginOptions = {
    accountNumber: defaultMarginOptions.accountNumber,
    denomination: AssetDenomination.Wei,
    depositToken: token0.address,
    isPositiveMarginDeposit: true,
    marginDeposit: pair_0_1.reserve0
  }

  describe('#swapCallParameters', () => {
    describe('exact in', () => {
      it('deadline specified', () => {
        const result = Router.swapCallParameters(
          Trade.exactIn(
            new Route([pair_weth_0, pair_0_1], weth, token1),
            CurrencyAmount.fromRawAmount(weth, JSBI.BigInt(100))
          ),
          {
            deadline: 50,
            recipient: '0x0000000000000000000000000000000000000004',
            allowedSlippage: new Percent('1', '100')
          },
          defaultMarginOptions
        )
        expect(result.methodName).toEqual('swapExactTokensForTokens')
        expect(result.args).toEqual(['0x0', '0x64', '0x51', [weth.address, token0.address, token1.address], '0x32'])
        expect(result.value).toEqual('0x0')
      })

      it('token0 to token1', () => {
        const result = Router.swapCallParameters(
          Trade.exactIn(new Route([pair_0_1], token0, token1), CurrencyAmount.fromRawAmount(token0, JSBI.BigInt(100))),
          {
            ttl: 50,
            recipient: '0x0000000000000000000000000000000000000004',
            allowedSlippage: new Percent('1', '100')
          },
          defaultMarginOptions
        )
        expect(result.methodName).toEqual('swapExactTokensForTokens')
        expect(result.args.slice(0, -1)).toEqual(['0x0', '0x64', '0x59', [token0.address, token1.address]])
        expect(result.value).toEqual('0x0')
        checkDeadline(result.args[result.args.length - 1])
      })
      it('token0 to token1 with non-default margin options', () => {
        const result = Router.swapCallParameters(
          Trade.exactIn(new Route([pair_0_1], token0, token1), CurrencyAmount.fromRawAmount(token0, JSBI.BigInt(100))),
          {
            ttl: 50,
            recipient: '0x0000000000000000000000000000000000000004',
            allowedSlippage: new Percent('1', '100')
          },
          marginOptions
        )
        expect(result.methodName).toEqual('swapExactTokensForTokensAndModifyPosition')
        expect(result.args.slice(0, -1)).toEqual([
          {
            accountNumber: '0x0',
            denomination: '0x0',
            amountIn: '0x64',
            amountOut: '0x59',
            tokenPath: [token0.address, token1.address],
            marginDeposit: `0x${marginOptions.marginDeposit?.quotient.toString(16)}`,
            isPositiveMarginDeposit: '0x1',
            depositToken: marginOptions.depositToken
          }
        ])
        expect(result.value).toEqual('0x0')
        checkDeadline(result.args[result.args.length - 1])
      })
    })
    describe('exact out', () => {
      it('token0 to token1', () => {
        const result = Router.swapCallParameters(
          Trade.exactOut(new Route([pair_0_1], token0, token1), CurrencyAmount.fromRawAmount(token1, JSBI.BigInt(100))),
          {
            ttl: 50,
            recipient: '0x0000000000000000000000000000000000000004',
            allowedSlippage: new Percent('1', '100')
          },
          defaultMarginOptions
        )
        expect(result.methodName).toEqual('swapTokensForExactTokens')
        expect(result.args.slice(0, -1)).toEqual(['0x0', '0x71', '0x64', [token0.address, token1.address]])
        expect(result.value).toEqual('0x0')
        checkDeadline(result.args[result.args.length - 1])
      })
      it('token0 to token1 with non-default margin options', () => {
        const result = Router.swapCallParameters(
          Trade.exactOut(new Route([pair_0_1], token0, token1), CurrencyAmount.fromRawAmount(token1, JSBI.BigInt(100))),
          {
            ttl: 50,
            recipient: '0x0000000000000000000000000000000000000004',
            allowedSlippage: new Percent('1', '100')
          },
          marginOptions
        )
        expect(result.methodName).toEqual('swapTokensForExactTokensAndModifyPosition')
        expect(result.args.slice(0, -1)).toEqual([
          {
            accountNumber: '0x0',
            denomination: '0x0',
            amountIn: '0x71',
            amountOut: '0x64',
            tokenPath: [token0.address, token1.address],
            depositToken: marginOptions.depositToken,
            isPositiveMarginDeposit: '0x1',
            marginDeposit: `0x${marginOptions.marginDeposit?.quotient.toString(16)}`
          }
        ])
        expect(result.value).toEqual('0x0')
        checkDeadline(result.args[result.args.length - 1])
      })
    })
  })
})
