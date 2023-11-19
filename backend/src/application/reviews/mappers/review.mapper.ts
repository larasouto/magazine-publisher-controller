import { Review as PersistenceReview } from '@prisma/client'
import { Review } from '../domain/review'
import { MapperError } from '@/core/errors/MapperErrors'

export class ReviewMapper {
  static toDomain(raw: PersistenceReview) {
    const reviewOrError = Review.create(
      {
        title: raw.title,
        review: raw.review,
        rating: raw.rating,
        editionId: raw.edition_id,
        reviewerId: raw.reviewer_id,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      raw.id,
    )

    if (reviewOrError.isLeft()) {
      throw new MapperError(reviewOrError.value.message)
    }

    return reviewOrError.value
  }

  static async toPersistence(review: Review) {
    return {
      id: review.id,
      title: review.props.title,
      review: review.props.review,
      rating: review.props.rating,
      edition_id: review.props.editionId,
      reviewer_id: review.props.reviewerId,
      created_at: review.props.createdAt,
      updated_at: review.props.updatedAt,
    }
  }
}
