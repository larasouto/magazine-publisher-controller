import { describe, expect, test } from 'vitest'
import { Graphics } from './graphics'

describe('Entity Graphics', () => {
  test('should be able to create a graphics', () => {
    const data: any = {
      name: 'Graphics name',
      addrees: 'Graphics addrees',
    }

    const sut = Graphics.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test('should not be able to create a graphics with invalid data', () => {
    const data: any = {
      name: '',
      addrees: null,
    }

    const sut = Graphics.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })
})
