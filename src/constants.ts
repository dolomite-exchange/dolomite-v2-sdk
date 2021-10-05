import JSBI from 'jsbi'

export const FACTORY_ADDRESSES: { [chainId: number]: string } = {
  1: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  80001: '0xaE3a05f33E2f358eB98c24F59f0E13f92D869160'
}

// was originally this, before merging Dolomite SDK
export const INIT_CODE_HASHES: { [chainId: number]: string } = {
  1: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
  80001: '0xb992084bf4edfb9d5119d2c12b71e897eeda42e7f4e4cb0c81f26807f9ce443a'
}

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const FIVE = JSBI.BigInt(5)
export const _997 = JSBI.BigInt(997)
export const _1000 = JSBI.BigInt(1000)
