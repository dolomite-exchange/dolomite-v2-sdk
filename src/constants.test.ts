// noinspection ES6PreferShortImport

import { keccak256 } from '@ethersproject/solidity'
import { bytecode } from '@dolomite-exchange/dolomite-margin/build/contracts/DolomiteAmmPair.json'

import { INIT_CODE_HASHES } from './constants'

// this _could_ go in constants, except that it would cost every consumer of the sdk the CPU to compute the hash
// and load the JSON.
const MUMBAI_COMPUTED_INIT_CODE_HASH = keccak256(['bytes'], [bytecode])
const ARBITRUM_COMPUTED_INIT_CODE_HASH = keccak256(['bytes'], [bytecode])

describe('constants', () => {
  describe('INIT_CODE_HASH', () => {
    it('matches Mumbai computed bytecode hash', () => {
      expect(MUMBAI_COMPUTED_INIT_CODE_HASH).toEqual(INIT_CODE_HASHES[80001])
    })
    it('matches Arbitrum computed bytecode hash', () => {
      expect(ARBITRUM_COMPUTED_INIT_CODE_HASH).toEqual(ARBITRUM_COMPUTED_INIT_CODE_HASH)
    })
  })
})
