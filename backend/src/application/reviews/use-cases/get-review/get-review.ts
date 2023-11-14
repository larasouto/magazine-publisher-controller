import { Either, left, right } from '@/core/logic/either'
import { Review } from '../../domain/review'
import { IReviewsRepository } from '../../repositories/interfaces/IReviewsRepository'
import { ReviewNotFoundError } from './errors/ReviewNotFoundError'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { ReviewerNotFoundError } from '../submit-review/errors/ReviewerNotFoundError'

type GetReviewRequest = {
  reviewId: string
  userId: string
}

type GetReviewResponse = Either<ReviewNotFoundError, Review>

export class GetReview {
  constructor(
    private reviewsRepository: IReviewsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    reviewId,
    userId,
  }: GetReviewRequest): Promise<GetReviewResponse> {
    const review = await this.reviewsRepository.findById(reviewId)

    if (!review) {
      return left(new ReviewNotFoundError())
    }

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new ReviewerNotFoundError())
    }

    return right(review)
  }
}
