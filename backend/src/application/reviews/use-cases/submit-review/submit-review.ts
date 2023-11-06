import { Either, left, right } from '@/core/logic/either'
import { Review } from '../../domain/review'
import { IReviewsRepository } from '../../repositories/interfaces/IReviewsRepository'
import { IUsersRepository } from '@/application/users/repositories/interfaces/IUsersRepository'
import { ReviewerNotFoundError } from './errors/ReviewerNotFoundError'
import { IEditionRepository } from '@/application/editions/repositories/interfaces/IEditionRepository'
import { EditionNotFoundError } from './errors/EditionNotFoundError'

type SubmitReviewRequest = {
  title: string
  review: string
  rating: number
  editionId: string
  userId: string
}

type SubmitReviewResponse = Either<Error, Review>

export class SubmitReview {
  constructor(
    private reviewsRepository: IReviewsRepository,
    private editionsRepository: IEditionRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    userId: reviewerId,
    ...request
  }: SubmitReviewRequest): Promise<SubmitReviewResponse> {
    const reviewOrError = Review.create({ ...request, reviewerId })

    if (reviewOrError.isLeft()) {
      return left(reviewOrError.value)
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
    await this.reviewsRepository.create(review)

    return right(review)
  }
}
