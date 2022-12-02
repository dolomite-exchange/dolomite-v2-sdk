import JSBI from 'jsbi'

export const FACTORY_ADDRESSES: { [chainId: number]: string } = {
  1: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  42161: '0xD99c21C96103F36BC1FA26DD6448af4DA030c1EF',
  421611: '0xf3f88a800779cC0B0858019D2e09757b49abfFe6',
  421613: '0xa712182078dD19642C00fB1f49A5D9a2D7283a5b',
  80001: '0x790C61eA35C6480f46EBCFff390e2dB5745B4Dd1'
}

export const INIT_CODE_HASHES: { [chainId: number]: string } = {
  1: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
  42161: '0x3a71df2e5dedc0551796096fa5135dd704506f5cdcd786351b313d77f498666e',
  421611: '0x71f2b6858dda1ac4596bffd34e6a767f1847201041dd0c76ed963877e5461b86',
  421613: '0x3a71df2e5dedc0551796096fa5135dd704506f5cdcd786351b313d77f498666e',
  80001: '0xe6a28b91a2f6ed25ca52fc081821cf7e099221d7cad41fa6c6239bad4ce3803f'
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
  From = 1,
  To = 2,
  None = 3,
}
