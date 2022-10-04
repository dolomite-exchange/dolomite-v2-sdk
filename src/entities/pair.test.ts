// noinspection ES6PreferShortImport

import { CurrencyAmount, Price, Token, WRAPPED_CURRENCY } from '@dolomite-exchange/sdk-core'
import { InsufficientInputAmountError } from '../errors'
import { computePairAddress, Pair } from './pair'

describe('computePairAddress', () => {
  it('should correctly compute the pool address on mainnet', () => {
    const tokenA = new Token(1, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD Coin')
    const tokenB = new Token(1, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'DAI Stablecoin')
    const result = computePairAddress({
      chainId: 1,
      tokenA,
      tokenB
    })

    expect(result).toEqual('0xAE461cA67B15dc8dc81CE7615e0320dA1A9aB8D5')
  })
  it('should give same result regardless of token order', () => {
    const USDC = new Token(1, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 18, 'USDC', 'USD Coin')
    const DAI = new Token(1, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'DAI Stablecoin')
    let tokenA = USDC
    let tokenB = DAI
    const resultA = computePairAddress({
      chainId: 80001,
      tokenA,
      tokenB
    })

    tokenA = DAI
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
  const DAI = 'DAI'
  const USDC = 'USDC'
  const WETH = 'WETH'

  const DAIName = 'DAI Stablecoin'
  const USDCName = 'USDC Coin'
  const WETHName = 'Wrapped Ether'

  const MAINNET_USDC = new Token(1, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 18, USDC, USDCName)
  const MAINNET_DAI = new Token(1, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, DAI, DAIName)
  const MUMBAI_USDC = new Token(800001, '0xaDe692C9B8C36e6b04bCFD01f0E91c7EbeE0A160', 6, USDC, USDCName)
  const MUMBAI_WETH = new Token(800001, '0xa38eF095D071ebBAFeA5E7D1Ce02BE79fc376793', 18, WETH, WETHName)
  const ARBITRUM_ONE_USDC = new Token(42161, '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8', 6, USDC, USDCName)
  const ARBITRUM_ONE_WETH = new Token(42161, '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', 18, WETH, WETHName)
  const ARBITRUM_RINKEBY_USDC = new Token(421611, '0xf5ba7ca17aF300F52112C4CC8A7AB1A0482e84D5', 6, USDC, USDCName)
  const ARBITRUM_RINKEBY_WETH = new Token(421611, '0x267dc5f342e139b5E407684e3A731aeaE8A71E3e', 18, WETH, WETHName)
  const ARBITRUM_GOERLI_USDC = new Token(421613, '0x7317eb743583250739862644cef74B982708eBB4', 6, USDC, USDCName)
  const ARBITRUM_GOERLI_WETH = new Token(421613, '0xC033378c6eEa969C001CE9438973ca4d6460999a', 18, WETH, WETHName)

  describe('constructor', () => {
    it('cannot be used for tokens on different chains', () => {
      expect(
        () =>
          new Pair(
            CurrencyAmount.fromRawAmount(MAINNET_USDC, '100'),
            CurrencyAmount.fromRawAmount(WRAPPED_CURRENCY[3], '100')
          )
      ).toThrow('CHAIN_IDS')
    })
  })

  describe('#getAddress', () => {
    it('returns the correct address for mumbai', () => {
      expect(Pair.getAddress(MUMBAI_WETH, MUMBAI_USDC, 80001)).toEqual('0xe33f1f1B0E167AF70F7Ee1E357c519A387EDd841')
    })
    it('returns the correct address for arbitrum one', () => {
      expect(Pair.getAddress(ARBITRUM_ONE_WETH, ARBITRUM_ONE_USDC, 42161)).toEqual(
        '0xb77a493A4950cAd1b049E222d62BCE14fF423c6F'
      )
    })
    it('returns the correct address for arbitrum rinkeby', () => {
      expect(Pair.getAddress(ARBITRUM_RINKEBY_WETH, ARBITRUM_RINKEBY_USDC, 421611)).toEqual(
        '0x71Eb0f204FD99Df9c9C111E7C4C2819fc28548b1'
      )
    })
    it('returns the correct address for arbitrum goerli', () => {
      expect(Pair.getAddress(ARBITRUM_GOERLI_WETH, ARBITRUM_GOERLI_USDC, 421613)).toEqual(
        '0x1503FfD3a68979A990e01D08566CfA50C5A2AaC7'
      )
    })
  })

  describe('#token0', () => {
    it('always is the token that sorts before', () => {
      expect(
        new Pair(CurrencyAmount.fromRawAmount(MAINNET_USDC, '100'), CurrencyAmount.fromRawAmount(MAINNET_DAI, '100'))
          .token0
      ).toEqual(MAINNET_DAI)
      expect(
        new Pair(CurrencyAmount.fromRawAmount(MAINNET_DAI, '100'), CurrencyAmount.fromRawAmount(MAINNET_USDC, '100'))
          .token0
      ).toEqual(MAINNET_DAI)
    })
  })

  describe('#token1', () => {
    it('always is the token that sorts after', () => {
      expect(
        new Pair(CurrencyAmount.fromRawAmount(MAINNET_USDC, '100'), CurrencyAmount.fromRawAmount(MAINNET_DAI, '100'))
          .token1
      ).toEqual(MAINNET_USDC)
      expect(
        new Pair(CurrencyAmount.fromRawAmount(MAINNET_DAI, '100'), CurrencyAmount.fromRawAmount(MAINNET_USDC, '100'))
          .token1
      ).toEqual(MAINNET_USDC)
    })
  })

  describe('#reserve0', () => {
    it('always comes from the token that sorts before', () => {
      expect(
        new Pair(CurrencyAmount.fromRawAmount(MAINNET_USDC, '100'), CurrencyAmount.fromRawAmount(MAINNET_DAI, '101'))
          .reserve0
      ).toEqual(CurrencyAmount.fromRawAmount(MAINNET_DAI, '101'))
      expect(
        new Pair(CurrencyAmount.fromRawAmount(MAINNET_DAI, '101'), CurrencyAmount.fromRawAmount(MAINNET_USDC, '100'))
          .reserve0
      ).toEqual(CurrencyAmount.fromRawAmount(MAINNET_DAI, '101'))
    })
  })

  describe('#reserve1', () => {
    it('always comes from the token that sorts after', () => {
      expect(
        new Pair(CurrencyAmount.fromRawAmount(MAINNET_USDC, '100'), CurrencyAmount.fromRawAmount(MAINNET_DAI, '101'))
          .reserve1
      ).toEqual(CurrencyAmount.fromRawAmount(MAINNET_USDC, '100'))
      expect(
        new Pair(CurrencyAmount.fromRawAmount(MAINNET_DAI, '101'), CurrencyAmount.fromRawAmount(MAINNET_USDC, '100'))
          .reserve1
      ).toEqual(CurrencyAmount.fromRawAmount(MAINNET_USDC, '100'))
    })
  })

  describe('#token0Price', () => {
    it('returns price of token0 in terms of token1', () => {
      expect(
        new Pair(CurrencyAmount.fromRawAmount(MAINNET_USDC, '101'), CurrencyAmount.fromRawAmount(MAINNET_DAI, '100'))
          .token0Price
      ).toEqual(new Price(MAINNET_DAI, MAINNET_USDC, '100', '101'))
      expect(
        new Pair(CurrencyAmount.fromRawAmount(MAINNET_DAI, '100'), CurrencyAmount.fromRawAmount(MAINNET_USDC, '101'))
          .token0Price
      ).toEqual(new Price(MAINNET_DAI, MAINNET_USDC, '100', '101'))
    })
  })

  describe('#token1Price', () => {
    it('returns price of token1 in terms of token0', () => {
      expect(
        new Pair(CurrencyAmount.fromRawAmount(MAINNET_USDC, '101'), CurrencyAmount.fromRawAmount(MAINNET_DAI, '100'))
          .token1Price
      ).toEqual(new Price(MAINNET_USDC, MAINNET_DAI, '101', '100'))
      expect(
        new Pair(CurrencyAmount.fromRawAmount(MAINNET_DAI, '100'), CurrencyAmount.fromRawAmount(MAINNET_USDC, '101'))
          .token1Price
      ).toEqual(new Price(MAINNET_USDC, MAINNET_DAI, '101', '100'))
    })
  })

  describe('#priceOf', () => {
    const pair = new Pair(
      CurrencyAmount.fromRawAmount(MAINNET_USDC, '101'),
      CurrencyAmount.fromRawAmount(MAINNET_DAI, '100')
    )
    it('returns price of token in terms of other token', () => {
      expect(pair.priceOf(MAINNET_DAI)).toEqual(pair.token0Price)
      expect(pair.priceOf(MAINNET_USDC)).toEqual(pair.token1Price)
    })

    it('throws if invalid token', () => {
      expect(() => pair.priceOf(WRAPPED_CURRENCY[1])).toThrow('TOKEN')
    })
  })

  describe('#reserveOf', () => {
    it('returns reserves of the given token', () => {
      expect(
        new Pair(
          CurrencyAmount.fromRawAmount(MAINNET_USDC, '100'),
          CurrencyAmount.fromRawAmount(MAINNET_DAI, '101')
        ).reserveOf(MAINNET_USDC)
      ).toEqual(CurrencyAmount.fromRawAmount(MAINNET_USDC, '100'))
      expect(
        new Pair(
          CurrencyAmount.fromRawAmount(MAINNET_DAI, '101'),
          CurrencyAmount.fromRawAmount(MAINNET_USDC, '100')
        ).reserveOf(MAINNET_USDC)
      ).toEqual(CurrencyAmount.fromRawAmount(MAINNET_USDC, '100'))
    })

    it('throws if not in the pair', () => {
      expect(() =>
        new Pair(
          CurrencyAmount.fromRawAmount(MAINNET_DAI, '101'),
          CurrencyAmount.fromRawAmount(MAINNET_USDC, '100')
        ).reserveOf(WRAPPED_CURRENCY[1])
      ).toThrow('TOKEN')
    })
  })

  describe('#chainId', () => {
    it('returns the token0 chainId', () => {
      expect(
        new Pair(CurrencyAmount.fromRawAmount(MAINNET_USDC, '100'), CurrencyAmount.fromRawAmount(MAINNET_DAI, '100'))
          .chainId
      ).toEqual(1)
      expect(
        new Pair(CurrencyAmount.fromRawAmount(MAINNET_DAI, '100'), CurrencyAmount.fromRawAmount(MAINNET_USDC, '100'))
          .chainId
      ).toEqual(1)
    })
  })

  describe('#involvesToken', () => {
    expect(
      new Pair(
        CurrencyAmount.fromRawAmount(MAINNET_USDC, '100'),
        CurrencyAmount.fromRawAmount(MAINNET_DAI, '100')
      ).involvesToken(MAINNET_USDC)
    ).toEqual(true)
    expect(
      new Pair(
        CurrencyAmount.fromRawAmount(MAINNET_USDC, '100'),
        CurrencyAmount.fromRawAmount(MAINNET_DAI, '100')
      ).involvesToken(MAINNET_DAI)
    ).toEqual(true)
    expect(
      new Pair(
        CurrencyAmount.fromRawAmount(MAINNET_USDC, '100'),
        CurrencyAmount.fromRawAmount(MAINNET_DAI, '100')
      ).involvesToken(WRAPPED_CURRENCY[1])
    ).toEqual(false)
  })

  describe('miscellaneous', () => {
    it('getLiquidityMinted:0', async () => {
      const tokenA = new Token(3, '0x0000000000000000000000000000000000000001', 18)
      const tokenB = new Token(3, '0x0000000000000000000000000000000000000002', 18)
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
      const tokenA = new Token(3, '0x0000000000000000000000000000000000000001', 18)
      const tokenB = new Token(3, '0x0000000000000000000000000000000000000002', 18)
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
      const tokenA = new Token(3, '0x0000000000000000000000000000000000000001', 18)
      const tokenB = new Token(3, '0x0000000000000000000000000000000000000002', 18)
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
      const tokenA = new Token(3, '0x0000000000000000000000000000000000000001', 18)
      const tokenB = new Token(3, '0x0000000000000000000000000000000000000002', 18)
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
