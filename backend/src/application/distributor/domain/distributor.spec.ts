import { describe, expect, test } from 'vitest'
import { Distributor } from './distributor'

describe('Entity Distributor', () => {
  test('should be able to create a dsitributor', () => {
    const data: any = {
      name: 'Distributor name',
      addrees: 'Distributor addrees',
      region: 'region',
    }

    const sut = Distributor.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test('should not be able to create a dsitributor with invalid data', () => {
    const data: any = {
      name: '',
      addrees: null,
      region: null,
    }

    const sut = Distributor.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })
})