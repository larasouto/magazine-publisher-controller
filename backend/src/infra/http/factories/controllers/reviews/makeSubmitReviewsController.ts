import { PrismaEditionsRepository } from '@/application/editions/repositories/prisma/PrismaEditionsRepository'
import { PrismaReviewsRepository } from '@/application/reviews/repositories/prisma/PrismaReviewsRepository'
import { SubmitReview } from '@/application/reviews/use-cases/submit-review/submit-review'
import { SubmitReviewController } from '@/application/reviews/use-cases/submit-review/submit-review.controller'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeSubmitReviewsController(): Controller {
  const prismaReviewsRepository = new PrismaReviewsRepository()
  const prismaEditionsRepository = new PrismaEditionsRepository()
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCaseCreateReview = new SubmitReview(
    prismaReviewsRepository,
    prismaEditionsRepository,
    prismaUsersRepository,
  )

  const validator = new ValidatorCompositor([])

  return new SubmitReviewController(validator, useCaseCreateReview)
}
