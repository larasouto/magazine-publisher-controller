import { describe, expect, test } from 'vitest'
import { Subtitle } from './subtitle'

describe('Entity Subtitle', () => {
  test('should be able to create a subtitle', () => {
    const data: any = {
      name: 'sub-name',
      type: 'CONTENT SUMMARY',
    }

    const sut = Subtitle.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test('should be able to create a subtitle with only a name', () => {
    const data: any = {
      name: 'sub-name',
    }

    const sut = Subtitle.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test('should not be able to create a subtitle with invalid data', () => {
    const data: any = {}

    const sut = Subtitle.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })
})
