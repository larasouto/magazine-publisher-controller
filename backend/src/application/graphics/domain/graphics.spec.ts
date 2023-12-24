import { describe, expect, test } from 'vitest'
import { Graphics } from './graphics'

describe('Entity Graphics', () => {
  test('should be able to create a graphics', () => {
    const data: any = {
      name: 'Graphics',
      street: 'Street',
      number: 123,
      city: 'City',
      state: 'State',
      country: 'Country',
      zipCode: '97000-000',
    }

    const sut = Graphics.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test('should not be able to create a graphics with invalid data', () => {
    const data: any = {}

    const sut = Graphics.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })
})
