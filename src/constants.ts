import JSBI from 'jsbi'

export const FACTORY_ADDRESSES: { [chainId: number]: string } = {
  1: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  42161: '0xd55AFc5eE5fFdAd3d44829b22E2C2B10a484D33e',
  421611: '0x5Babd6BC57Adb445f388D6f2Cf3016590a16c488',
  80001: '0x790C61eA35C6480f46EBCFff390e2dB5745B4Dd1'
}

export const INIT_CODE_HASHES: { [chainId: number]: string } = {
  1: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
  42161: '0x72e532f178976f0b2709dad281aaf3ca933852570f81dfcc61269694186fe150',
  421611: '0x8f6d112da1d915460ccf0a861b465574a4d0016a6e391fd4363a61668ead22e0',
  80001: '0xe6a28b91a2f6ed25ca52fc081821cf7e099221d7cad41fa6c6239bad4ce3803f'
}

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const FIVE = JSBI.BigInt(5)
export const _997 = JSBI.BigInt(997)
export const _1000 = JSBI.BigInt(1000)
