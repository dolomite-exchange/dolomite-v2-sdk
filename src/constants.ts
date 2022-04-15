import JSBI from 'jsbi'

export const FACTORY_ADDRESSES: { [chainId: number]: string } = {
  1: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  42161: '0xf1aD8A1845b2D8a7c87c5915243D87f074921615',
  421611: '0x9E9f67A738dc71A1d0e8896B731f76874C62EC02',
  80001: '0x790C61eA35C6480f46EBCFff390e2dB5745B4Dd1'
}

export const INIT_CODE_HASHES: { [chainId: number]: string } = {
  1: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
  42161: '0x13613659a8fb260634987eac314e43a23a2f6ae932427b0ed2c90b8f8785e592',
  421611: '0x13613659a8fb260634987eac314e43a23a2f6ae932427b0ed2c90b8f8785e592',
  80001: '0xe6a28b91a2f6ed25ca52fc081821cf7e099221d7cad41fa6c6239bad4ce3803f'
}

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const FIVE = JSBI.BigInt(5)
export const _997 = JSBI.BigInt(997)
export const _1000 = JSBI.BigInt(1000)
