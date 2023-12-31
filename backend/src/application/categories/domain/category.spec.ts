import { describe, expect, test } from 'vitest'
import { Category } from './category'

describe('Entity Category', () => {
  test('should be able to create a category', () => {
    const data: any = {
      name: 'test-category',
      description: 'test-category-description',
    }

    const sut = Category.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test('should not be able to create a category with invalid data', () => {
    const data: any = {
      name: '',
      description: null,
    }

    const sut = Category.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })

  test('should be able to create a category with only a name', () => {
    const data: any = {
      name: 'test-category',
    }

    const sut = Category.create(data)
    expect(sut.isRight()).toBeTruthy()
  })
})
