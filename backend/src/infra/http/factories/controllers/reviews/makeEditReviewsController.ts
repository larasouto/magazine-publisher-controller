import { PrismaEditionsRepository } from '@/application/editions/repositories/prisma/PrismaEditionsRepository'
import { PrismaReviewsRepository } from '@/application/reviews/repositories/prisma/PrismaReviewsRepository'
import { EditReview } from '@/application/reviews/use-cases/edit-review/edit-review'
import { EditReviewController } from '@/application/reviews/use-cases/edit-review/edit-review.controller'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeEditReviewsController(): Controller {
  const prismaReviewsRepository = new PrismaReviewsRepository()
  const prismaUsersRepository = new PrismaUsersRepository()
  const prismaEditionsRepository = new PrismaEditionsRepository()
  const useCaseEditReview = new EditReview(
    prismaReviewsRepository,
    prismaEditionsRepository,
    prismaUsersRepository,
  )

  const validator = new ValidatorCompositor([])

  return new EditReviewController(validator, useCaseEditReview)
}
