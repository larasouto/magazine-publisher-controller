import { Review } from '@/application/reviews/domain/review'
import { EditionFactory } from './EditionFactory'

type ReviewOverrides = {
  title?: string
  review?: string
  rating?: number
  date?: Date
  editionId?: string
  reviewerId: string
}

export class ReviewFactory {
  static create(overrides: ReviewOverrides) {
    const { edition, magazine, theme } = EditionFactory.createWithDependencies()

    const review = Review.create({
      title: 'test-review-title',
      review: 'test-review',
      rating: 5,
      date: new Date(),
      editionId: edition.id,
      ...overrides,
    })

    return { review: review.value as Review, edition, magazine, theme }
  }
}
