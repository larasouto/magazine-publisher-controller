import { Review } from '../../domain/review'
import { IReviewsRepository } from '../../repositories/interfaces/IReviewsRepository'

type ListReviewsResponse = Review[]

export class ListReviews {
  constructor(private reviewsRepository: IReviewsRepository) {}

  async execute(): Promise<ListReviewsResponse> {
    const reviews = await this.reviewsRepository.list()
    return reviews
  }
}
