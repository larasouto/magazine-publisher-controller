import { Review } from '../../domain/review'

export interface IReviewsRepository {
  findById(id: string): Promise<Review | null>
  create(review: Review): Promise<void>
  update(review: Review): Promise<void>
  deleteMany(ids: string[]): Promise<void>
  list(editionId: string): Promise<Review[]>
  exists(id: string): Promise<boolean>
}
