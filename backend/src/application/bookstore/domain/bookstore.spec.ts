import { describe, expect, test } from 'vitest'
import { Bookstore } from './bookstore'

describe('Entity bookstore', () => {
  test('should be able to create a theme', () => {
    const data: any = {
      address: ' address',
    }

    const sut = Bookstore.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test('should not be able to create a bookstore with invalid data', () => {
    const data: any = {
      address: null,
    }

    const sut = Bookstore.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })
})
