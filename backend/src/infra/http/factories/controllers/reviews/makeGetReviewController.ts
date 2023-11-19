import { PrismaReviewsRepository } from '@/application/reviews/repositories/prisma/PrismaReviewsRepository'
import { GetReview } from '@/application/reviews/use-cases/get-review/get-review'
import { GetReviewController } from '@/application/reviews/use-cases/get-review/get-review.controller'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeGetReviewController(): Controller {
  const prismaReviewsRepository = new PrismaReviewsRepository()
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCaseGetReview = new GetReview(
    prismaReviewsRepository,
    prismaUsersRepository,
  )

  const validator = new ValidatorCompositor([])

  return new GetReviewController(validator, useCaseGetReview)
}
