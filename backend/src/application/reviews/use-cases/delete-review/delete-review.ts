import { Either, left, right } from '@/core/logic/either'
import { IReviewsRepository } from '../../repositories/interfaces/IReviewsRepository'
import { OneOrMoreReviewNotFoundError } from './errors/OneOrMoreReviewNotFoundError'
import { ReviewNotFoundError } from './errors/ReviewNotFoundError'

type DeleteReviewRequest = {
  ids: string[]
}

type DeleteReviewResponse = Either<
  ReviewNotFoundError | OneOrMoreReviewNotFoundError,
  null
>

export class DeleteReview {
  constructor(private reviewsRepository: IReviewsRepository) {}

  async execute({
    ids: reviewId,
  }: DeleteReviewRequest): Promise<DeleteReviewResponse> {
    const reviewOrReviews = Array.isArray(reviewId) ? reviewId : [reviewId]

    if (reviewOrReviews.length === 0) {
      return left(new OneOrMoreReviewNotFoundError())
    }

    const reviewPromises = reviewOrReviews
      .filter((reviewId) => reviewId)
      .map((reviewId) => this.reviewsRepository.findById(reviewId))

    const reviews = await Promise.all(reviewPromises)

    if (reviews.some((review) => review === null)) {
      return left(
        reviews.length > 1
          ? new OneOrMoreReviewNotFoundError()
          : new ReviewNotFoundError(),
      )
    }

    await this.reviewsRepository.deleteMany(reviewOrReviews)

    return right(null)
  }
}
