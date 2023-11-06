import { ReviewFactory } from '@/tests/factories/ReviewFactory'
import { beforeEach, describe, expect, test } from 'vitest'
import { InMemoryReviewsRepository } from '../../repositories/in-memory/InMemoryReviewsRepository'
import { IReviewsRepository } from '../../repositories/interfaces/IReviewsRepository'
import { DeleteReview } from './delete-review'

let reviewsRepository: IReviewsRepository
let deleteReview: DeleteReview

describe('Delete review', () => {
  beforeEach(() => {
    reviewsRepository = new InMemoryReviewsRepository()
    deleteReview = new DeleteReview(reviewsRepository)
  })

  test('should delete a review', async () => {
    const { review: review1 } = ReviewFactory.create()
    const { review: review2 } = ReviewFactory.create()

    await reviewsRepository.create(review1)
    await reviewsRepository.create(review2)

    const response = await deleteReview.execute({
      ids: [review1.id, review2.id],
    })

    expect(response.isRight()).toBeTruthy()
    expect(await reviewsRepository.list()).toStrictEqual([])
  })

  test('should not delete a non-existing review', async () => {
    const { review } = ReviewFactory.create()
    await reviewsRepository.create(review)

    const response = await deleteReview.execute({
      ids: [review.id, 'non-existing-id'],
    })

    expect(response.isLeft()).toBeTruthy()
    expect(await reviewsRepository.list()).toStrictEqual([review])
  })
})
