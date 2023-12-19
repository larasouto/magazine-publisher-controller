import { Review } from '../../domain/review'
import { IReviewsRepository } from '../../repositories/interfaces/IReviewsRepository'

type ListReviewsResponse = Review[]

type ListReviewsRequest = {
  editionId: string
}

export class ListReviews {
  constructor(private reviewsRepository: IReviewsRepository) {}

  async execute({ editionId, }: ListReviewsRequest): Promise<ListReviewsResponse> {
    const reviews = await this.reviewsRepository.list(editionId)
    return reviews
  }
}
