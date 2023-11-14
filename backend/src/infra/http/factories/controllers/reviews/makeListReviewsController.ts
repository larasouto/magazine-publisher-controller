import { PrismaReviewsRepository } from '@/application/reviews/repositories/prisma/PrismaReviewsRepository'
import { ListReviews } from '@/application/reviews/use-cases/list-review/list-review'
import { ListReviewsController } from '@/application/reviews/use-cases/list-review/list-review.controller'
import { Controller } from '@/core/infra/controller'

export function makeListReviewsController(): Controller {
  const prismaReviewsRepository = new PrismaReviewsRepository()
  const useCaseListReview = new ListReviews(prismaReviewsRepository)

  return new ListReviewsController(useCaseListReview)
}
