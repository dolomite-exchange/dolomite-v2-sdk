import JSBI from 'jsbi'

export const FACTORY_ADDRESSES: Record<number, string | undefined> = {
  1: undefined,
  1101: undefined,
  8453: undefined,
  42161: '0xD99c21C96103F36BC1FA26DD6448af4DA030c1EF'
}

export const INIT_CODE_HASHES: Record<number, string | undefined> = {
  1: undefined,
  1101: undefined,
  8453: undefined,
  42161: '0x3a71df2e5dedc0551796096fa5135dd704506f5cdcd786351b313d77f498666e'
}

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const FIVE = JSBI.BigInt(5)
export const _997 = JSBI.BigInt(997)
export const _1000 = JSBI.BigInt(1000)

export enum BalanceCheckFlag {
  Both = 0,
  FromAccount = 1,
  TradeAccount = 1,
  ToAccount = 2,
  OtherAccount = 2,
  None = 3
}
