// noinspection ES6PreferShortImport

import { CurrencyAmount, Price, Token, WRAPPED_CURRENCY } from '@dolomite-exchange/sdk-core'
import { InsufficientInputAmountError } from '../errors'
import { computePairAddress, Pair } from './pair'

const USDC = new Token(42161, '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8', 6, 'USDC.e', 'USD Coin')
const WETH = new Token(42161, '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', 18, 'WETH', 'WETH')

describe('computePairAddress', () => {
  it('should correctly compute the pool address on mainnet', () => {
    const result = computePairAddress({
      chainId: 42161,
      tokenA: USDC,
      tokenB: WETH
    })

    expect(result).toEqual('0xb77a493A4950cAd1b049E222d62BCE14fF423c6F')
  })
  it('should give same result regardless of token order', () => {
    let tokenA = USDC
    let tokenB = WETH
    const resultA = computePairAddress({
      chainId: 80001,
      tokenA,
      tokenB
    })

    tokenA = WETH
    tokenB = USDC
    const resultB = computePairAddress({
      chainId: 80001,
      tokenA,
      tokenB
    })

    expect(resultA).toEqual(resultB)
  })
})

describe('Pair', () => {
  const USDC = 'USDC'
  const DAI = 'DAI'
  const WETH = 'WETH'

  const USDCName = 'USDC Coin'
  const DAIName = 'DAI Coin'
  const WETHName = 'Wrapped Ether'

  const ARBITRUM_ONE_USDC = new Token(42161, '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8', 6, USDC, USDCName)
  const ARBITRUM_ONE_DAI = new Token(42161, '0xda10009cbd5d07dd0cecc66161fc93d7c9000da1', 18, DAI, DAIName)
  const ARBITRUM_ONE_WETH = new Token(42161, '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', 18, WETH, WETHName)

  describe('constructor', () => {
    it('cannot be used for tokens on different chains', () => {
      expect(
        () =>
          new Pair(
            CurrencyAmount.fromRawAmount(ARBITRUM_ONE_USDC, '100'),
            CurrencyAmount.fromRawAmount(WRAPPED_CURRENCY[1], '100')
          )
      ).toThrow('CHAIN_IDS')
    })
  })

  describe('#getAddress', () => {
    it('returns the correct address for arbitrum one', () => {
      expect(Pair.getAddress(ARBITRUM_ONE_WETH, ARBITRUM_ONE_USDC, 42161)).toEqual(
        '0xb77a493A4950cAd1b049E222d62BCE14fF423c6F'
      )
    })
  })

  describe('#token0', () => {
    it('always is the token that sorts before', () => {
      expect(
        new Pair(
          CurrencyAmount.fromRawAmount(ARBITRUM_ONE_USDC, '100'),
          CurrencyAmount.fromRawAmount(ARBITRUM_ONE_DAI, '100')
        ).token0
      ).toEqual(ARBITRUM_ONE_DAI)
      expect(
        new Pair(
          CurrencyAmount.fromRawAmount(ARBITRUM_ONE_DAI, '100'),
          CurrencyAmount.fromRawAmount(ARBITRUM_ONE_USDC, '100')
        ).token0
      ).toEqual(ARBITRUM_ONE_DAI)
    })
  })

  describe('#token1', () => {
    it('always is the token that sorts after', () => {
      expect(
        new Pair(
          CurrencyAmount.fromRawAmount(ARBITRUM_ONE_USDC, '100'),
          CurrencyAmount.fromRawAmount(ARBITRUM_ONE_DAI, '100')
        ).token1
      ).toEqual(ARBITRUM_ONE_USDC)
      expect(
        new Pair(
          CurrencyAmount.fromRawAmount(ARBITRUM_ONE_DAI, '100'),
          CurrencyAmount.fromRawAmount(ARBITRUM_ONE_USDC, '100')
        ).token1
      ).toEqual(ARBITRUM_ONE_USDC)
    })
  })

  describe('#reserve0', () => {
    it('always comes from the token that sorts before', () => {
      expect(
        new Pair(
          CurrencyAmount.fromRawAmount(ARBITRUM_ONE_USDC, '100'),
          CurrencyAmount.fromRawAmount(ARBITRUM_ONE_DAI, '101')
        ).reserve0
      ).toEqual(CurrencyAmount.fromRawAmount(ARBITRUM_ONE_DAI, '101'))
      expect(
        new Pair(
          CurrencyAmount.fromRawAmount(ARBITRUM_ONE_DAI, '101'),
          CurrencyAmount.fromRawAmount(ARBITRUM_ONE_USDC, '100')
        ).reserve0
      ).toEqual(CurrencyAmount.fromRawAmount(ARBITRUM_ONE_DAI, '101'))
    })
  })

  describe('#reserve1', () => {
    it('always comes from the token that sorts after', () => {
      expect(
        new Pair(
          CurrencyAmount.fromRawAmount(ARBITRUM_ONE_USDC, '100'),
          CurrencyAmount.fromRawAmount(ARBITRUM_ONE_DAI, '101')
        ).reserve1
      ).toEqual(CurrencyAmount.fromRawAmount(ARBITRUM_ONE_USDC, '100'))
      expect(
        new Pair(
          CurrencyAmount.fromRawAmount(ARBITRUM_ONE_DAI, '101'),
          CurrencyAmount.fromRawAmount(ARBITRUM_ONE_USDC, '100')
        ).reserve1
      ).toEqual(CurrencyAmount.fromRawAmount(ARBITRUM_ONE_USDC, '100'))
    })
  })

  describe('#token0Price', () => {
    it('returns price of token0 in terms of token1', () => {
      expect(
        new Pair(
          CurrencyAmount.fromRawAmount(ARBITRUM_ONE_USDC, '101'),
          CurrencyAmount.fromRawAmount(ARBITRUM_ONE_DAI, '100')
        ).token0Price
      ).toEqual(new Price(ARBITRUM_ONE_DAI, ARBITRUM_ONE_USDC, '100', '101'))
      expect(
        new Pair(
          CurrencyAmount.fromRawAmount(ARBITRUM_ONE_DAI, '100'),
          CurrencyAmount.fromRawAmount(ARBITRUM_ONE_USDC, '101')
        ).token0Price
      ).toEqual(new Price(ARBITRUM_ONE_DAI, ARBITRUM_ONE_USDC, '100', '101'))
    })
  })

  describe('#token1Price', () => {
    it('returns price of token1 in terms of token0', () => {
      expect(
        new Pair(
          CurrencyAmount.fromRawAmount(ARBITRUM_ONE_USDC, '101'),
          CurrencyAmount.fromRawAmount(ARBITRUM_ONE_DAI, '100')
        ).token1Price
      ).toEqual(new Price(ARBITRUM_ONE_USDC, ARBITRUM_ONE_DAI, '101', '100'))
      expect(
        new Pair(
          CurrencyAmount.fromRawAmount(ARBITRUM_ONE_DAI, '100'),
          CurrencyAmount.fromRawAmount(ARBITRUM_ONE_USDC, '101')
        ).token1Price
      ).toEqual(new Price(ARBITRUM_ONE_USDC, ARBITRUM_ONE_DAI, '101', '100'))
    })
  })

  describe('#priceOf', () => {
    const pair = new Pair(
      CurrencyAmount.fromRawAmount(ARBITRUM_ONE_USDC, '101'),
      CurrencyAmount.fromRawAmount(ARBITRUM_ONE_DAI, '100')
    )
    it('returns price of token in terms of other token', () => {
      expect(pair.priceOf(ARBITRUM_ONE_DAI)).toEqual(pair.token0Price)
      expect(pair.priceOf(ARBITRUM_ONE_USDC)).toEqual(pair.token1Price)
    })

    it('throws if invalid token', () => {
      expect(() => pair.priceOf(WRAPPED_CURRENCY[1])).toThrow('TOKEN')
    })
  })

  describe('#reserveOf', () => {
    it('returns reserves of the given token', () => {
      expect(
        new Pair(
          CurrencyAmount.fromRawAmount(ARBITRUM_ONE_USDC, '100'),
          CurrencyAmount.fromRawAmount(ARBITRUM_ONE_DAI, '101')
        ).reserveOf(ARBITRUM_ONE_USDC)
      ).toEqual(CurrencyAmount.fromRawAmount(ARBITRUM_ONE_USDC, '100'))
      expect(
        new Pair(
          CurrencyAmount.fromRawAmount(ARBITRUM_ONE_DAI, '101'),
          CurrencyAmount.fromRawAmount(ARBITRUM_ONE_USDC, '100')
        ).reserveOf(ARBITRUM_ONE_USDC)
      ).toEqual(CurrencyAmount.fromRawAmount(ARBITRUM_ONE_USDC, '100'))
    })

    it('throws if not in the pair', () => {
      expect(() =>
        new Pair(
          CurrencyAmount.fromRawAmount(ARBITRUM_ONE_DAI, '101'),
          CurrencyAmount.fromRawAmount(ARBITRUM_ONE_USDC, '100')
        ).reserveOf(WRAPPED_CURRENCY[1])
      ).toThrow('TOKEN')
    })
  })

  describe('#chainId', () => {
    it('returns the token0 chainId', () => {
      expect(
        new Pair(
          CurrencyAmount.fromRawAmount(ARBITRUM_ONE_USDC, '100'),
          CurrencyAmount.fromRawAmount(ARBITRUM_ONE_DAI, '100')
        ).chainId
      ).toEqual(42161)
      expect(
        new Pair(
          CurrencyAmount.fromRawAmount(ARBITRUM_ONE_DAI, '100'),
          CurrencyAmount.fromRawAmount(ARBITRUM_ONE_USDC, '100')
        ).chainId
      ).toEqual(42161)
    })
  })

  describe('#involvesToken', () => {
    expect(
      new Pair(
        CurrencyAmount.fromRawAmount(ARBITRUM_ONE_USDC, '100'),
        CurrencyAmount.fromRawAmount(ARBITRUM_ONE_DAI, '100')
      ).involvesToken(ARBITRUM_ONE_USDC)
    ).toEqual(true)
    expect(
      new Pair(
        CurrencyAmount.fromRawAmount(ARBITRUM_ONE_USDC, '100'),
        CurrencyAmount.fromRawAmount(ARBITRUM_ONE_DAI, '100')
      ).involvesToken(ARBITRUM_ONE_DAI)
    ).toEqual(true)
    expect(
      new Pair(
        CurrencyAmount.fromRawAmount(ARBITRUM_ONE_USDC, '100'),
        CurrencyAmount.fromRawAmount(ARBITRUM_ONE_DAI, '100')
      ).involvesToken(WRAPPED_CURRENCY[1])
    ).toEqual(false)
  })

  describe('miscellaneous', () => {
    it('getLiquidityMinted:0', async () => {
      const tokenA = new Token(42161, '0x0000000000000000000000000000000000000001', 18)
      const tokenB = new Token(42161, '0x0000000000000000000000000000000000000002', 18)
      const pair = new Pair(CurrencyAmount.fromRawAmount(tokenA, '0'), CurrencyAmount.fromRawAmount(tokenB, '0'))

      expect(() => {
        pair.getLiquidityMinted(
          CurrencyAmount.fromRawAmount(pair.liquidityToken, '0'),
          CurrencyAmount.fromRawAmount(tokenA, '1000'),
          CurrencyAmount.fromRawAmount(tokenB, '1000')
        )
      }).toThrow(InsufficientInputAmountError)

      expect(() => {
        pair.getLiquidityMinted(
          CurrencyAmount.fromRawAmount(pair.liquidityToken, '0'),
          CurrencyAmount.fromRawAmount(tokenA, '1000000'),
          CurrencyAmount.fromRawAmount(tokenB, '1')
        )
      }).toThrow(InsufficientInputAmountError)

      const liquidity = pair.getLiquidityMinted(
        CurrencyAmount.fromRawAmount(pair.liquidityToken, '0'),
        CurrencyAmount.fromRawAmount(tokenA, '1001'),
        CurrencyAmount.fromRawAmount(tokenB, '1001')
      )

      expect(liquidity.quotient.toString()).toEqual('1')
    })

    it('getLiquidityMinted:!0', async () => {
      const tokenA = new Token(42161, '0x0000000000000000000000000000000000000001', 18)
      const tokenB = new Token(42161, '0x0000000000000000000000000000000000000002', 18)
      const pair = new Pair(
        CurrencyAmount.fromRawAmount(tokenA, '10000'),
        CurrencyAmount.fromRawAmount(tokenB, '10000')
      )

      expect(
        pair
          .getLiquidityMinted(
            CurrencyAmount.fromRawAmount(pair.liquidityToken, '10000'),
            CurrencyAmount.fromRawAmount(tokenA, '2000'),
            CurrencyAmount.fromRawAmount(tokenB, '2000')
          )
          .quotient.toString()
      ).toEqual('2000')
    })

    it('getLiquidityValue:!feeOn', async () => {
      const tokenA = new Token(42161, '0x0000000000000000000000000000000000000001', 18)
      const tokenB = new Token(42161, '0x0000000000000000000000000000000000000002', 18)
      const pair = new Pair(CurrencyAmount.fromRawAmount(tokenA, '1000'), CurrencyAmount.fromRawAmount(tokenB, '1000'))

      {
        const liquidityValue = pair.getLiquidityValue(
          tokenA,
          CurrencyAmount.fromRawAmount(pair.liquidityToken, '1000'),
          CurrencyAmount.fromRawAmount(pair.liquidityToken, '1000'),
          false
        )
        expect(liquidityValue.currency.equals(tokenA)).toBe(true)
        expect(liquidityValue.quotient.toString()).toBe('1000')
      }

      // 500
      {
        const liquidityValue = pair.getLiquidityValue(
          tokenA,
          CurrencyAmount.fromRawAmount(pair.liquidityToken, '1000'),
          CurrencyAmount.fromRawAmount(pair.liquidityToken, '500'),
          false
        )
        expect(liquidityValue.currency.equals(tokenA)).toBe(true)
        expect(liquidityValue.quotient.toString()).toBe('500')
      }

      // tokenB
      {
        const liquidityValue = pair.getLiquidityValue(
          tokenB,
          CurrencyAmount.fromRawAmount(pair.liquidityToken, '1000'),
          CurrencyAmount.fromRawAmount(pair.liquidityToken, '1000'),
          false
        )
        expect(liquidityValue.currency.equals(tokenB)).toBe(true)
        expect(liquidityValue.quotient.toString()).toBe('1000')
      }
    })

    it('getLiquidityValue:feeOn', async () => {
      const tokenA = new Token(42161, '0x0000000000000000000000000000000000000001', 18)
      const tokenB = new Token(42161, '0x0000000000000000000000000000000000000002', 18)
      const pair = new Pair(CurrencyAmount.fromRawAmount(tokenA, '1000'), CurrencyAmount.fromRawAmount(tokenB, '1000'))

      const liquidityValue = pair.getLiquidityValue(
        tokenA,
        CurrencyAmount.fromRawAmount(pair.liquidityToken, '500'),
        CurrencyAmount.fromRawAmount(pair.liquidityToken, '500'),
        true,
        '250000' // 500 ** 2
      )
      expect(liquidityValue.currency.equals(tokenA)).toBe(true)
      expect(liquidityValue.quotient.toString()).toBe('917') // ceiling(1000 - (500 * (1 / 6)))
    })
  })
})
