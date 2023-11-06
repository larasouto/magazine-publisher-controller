import { describe, expect, test } from 'vitest'
import { Review } from './review'
import { v4 as uuid } from 'uuid'

describe('Entity Review', () => {
  test('should be able to create a review', () => {
    const data: any = {
      title: 'test-title',
      review: 'test-review',
      date: new Date(),
      rating: 4,
      editionId: uuid(),
      reviewerId: uuid(),
    }

    const sut = Review.create(data)
    expect(sut.isRight()).toBeTruthy()
  })

  test('should not be able to create a review with invalid data', () => {
    const data: any = {}

    const sut = Review.create(data)
    expect(sut.isLeft()).toBeTruthy()
  })
})
