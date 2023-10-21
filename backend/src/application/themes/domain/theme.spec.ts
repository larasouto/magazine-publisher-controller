import { describe, expect, test } from 'vitest'
import { Theme } from './theme'

describe('Entity Theme', () => {
  test('should be able to create a theme', () => {
    const data: any = {
      name: 'theme-name',
      description: 'theme-description',
    }

    const sut = Theme.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test('should be able to create a theme with only a name', () => {
    const data: any = {
      name: 'theme-name',
    }

    const sut = Theme.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test('should not be able to create a theme with invalid data', () => {
    const data: any = {
      name: '',
      description: null,
    }

    const sut = Theme.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })
})
