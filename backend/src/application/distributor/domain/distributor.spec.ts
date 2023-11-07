import { describe, expect, test } from 'vitest'
import { Distributor } from './distributor'

describe('Entity distributor', () => {
  test('should be able to create a theme', () => {
    const data: any = {
      name: 'name',
      address: 'address',
      region: 'region',
    }

    const sut = Distributor.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test('should not be able to create a distributor with invalid data', () => {
    const data: any = {
      name: '',
      address: null,
      region: null,
    }

    const sut = Distributor.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })
})
