import { Either, left, right } from '@/core/logic/either'
import { Review } from '../../domain/review'
import { IReviewsRepository } from '../../repositories/interfaces/IReviewsRepository'
import { ReviewNotFoundError } from './errors/ReviewNotFoundError'
import { EditionNotFoundError } from './errors/EditionNotFoundError'
import { IEditionRepository } from '@/application/editions/repositories/interfaces/IEditionRepository'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { ReviewerNotFoundError } from './errors/ReviewerNotFoundError'

type EditReviewRequest = {
  reviewId: string
  title: string
  review: string
  rating: number
  editionId: string
  userId: string
}

type EditReviewResponse = Either<ReviewNotFoundError, Review>

export class EditReview {
  constructor(
    private reviewsRepository: IReviewsRepository,
    private editionsRepository: IEditionRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    reviewId,
    userId: reviewerId,
    ...request
  }: EditReviewRequest): Promise<EditReviewResponse> {
    const reviewOrError = Review.create({ ...request, reviewerId }, reviewId)

    if (reviewOrError.isLeft()) {
      return left(reviewOrError.value)
    }

    const reviewExists = await this.reviewsRepository.findById(reviewId)

    if (!reviewExists) {
      return left(new ReviewNotFoundError())
    }

    const editionExists = await this.editionsRepository.findById(
      request.editionId,
    )

    if (!editionExists) {
      return left(new EditionNotFoundError())
    }

    const reviewerExists = await this.usersRepository.findById(reviewerId)

    if (!reviewerExists) {
      return left(new ReviewerNotFoundError())
    }

    const review = reviewOrError.value
    await this.reviewsRepository.update(review)

    return right(review)
  }
}
