import { PrismaReviewsRepository } from '@/application/reviews/repositories/prisma/PrismaReviewsRepository'
import { DeleteReview } from '@/application/reviews/use-cases/delete-review/delete-review'
import { DeleteReviewController } from '@/application/reviews/use-cases/delete-review/delete-review.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeDeleteReviewsController(): Controller {
  const prismaReviewsRepository = new PrismaReviewsRepository()
  const useCaseDeleteReview = new DeleteReview(prismaReviewsRepository)

  const validator = new ValidatorCompositor([])

  return new DeleteReviewController(validator, useCaseDeleteReview)
}
