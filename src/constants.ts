import JSBI from 'jsbi'

export const FACTORY_ADDRESSES: { [chainId: number]: string } = {
  1: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
  42161: '0x38fF2f1B4f104eE4830D7A46ADbF74Fa7EA07a7E',
  421611: '0xcD6b7A449b495339Db8cB84047cf7C9B53443f2F',
  80001: '0x790C61eA35C6480f46EBCFff390e2dB5745B4Dd1'
}

// was originally this, before merging Dolomite SDK
export const INIT_CODE_HASHES: { [chainId: number]: string } = {
  1: '0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f',
  42161: '0x9edcda3fdaab1b87309439b13fca8cb91cf8c4dbbf7796f5fe761f7397595bf9',
  421611: '0x9edcda3fdaab1b87309439b13fca8cb91cf8c4dbbf7796f5fe761f7397595bf9',
  80001: '0xe6a28b91a2f6ed25ca52fc081821cf7e099221d7cad41fa6c6239bad4ce3803f'
}

export const MINIMUM_LIQUIDITY = JSBI.BigInt(1000)

// exports for internal consumption
export const ZERO = JSBI.BigInt(0)
export const ONE = JSBI.BigInt(1)
export const FIVE = JSBI.BigInt(5)
export const _997 = JSBI.BigInt(997)
export const _1000 = JSBI.BigInt(1000)
