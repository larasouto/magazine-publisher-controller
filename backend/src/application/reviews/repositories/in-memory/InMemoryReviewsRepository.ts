import { Review } from '../../domain/review'
import { IReviewsRepository } from '../interfaces/IReviewsRepository'

export class InMemoryReviewsRepository implements IReviewsRepository {
  constructor(public reviews: Review[] = []) {}

  async findById(id: string): Promise<Review | null> {
    const review = this.reviews.find((review) => review.id === id)

    if (!review) {
      return null
    }

    return review
  }

  async create(review: Review): Promise<void> {
    this.reviews.push(review)
  }

  async deleteMany(ids: string[]): Promise<void> {
    ids.forEach((id) => {
      const reviewIndex = this.reviews.findIndex((review) => review.id === id)

      this.reviews.splice(reviewIndex, 1)
    })
  }

  async update(review: Review): Promise<void> {
    const reviewIndex = this.reviews.findIndex(
      (review) => review.id === review.id,
    )

    this.reviews[reviewIndex] = review
  }

  async exists(id: string): Promise<boolean> {
    const review = this.reviews.some((review) => review.id === id)
    return !!review
  }

  async list(): Promise<Review[]> {
    return this.reviews
  }
}
