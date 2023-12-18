import { PrismaSubscriptionsRepository } from '@/application/subscriptions/user/repositories/prisma/PrismaSubscriptionsRepository'
import { CancelSubscription } from '@/application/subscriptions/user/use-cases/cancel-subscription/cancel-subscription'
import { CancelSubscriptionController } from '@/application/subscriptions/user/use-cases/cancel-subscription/cancel-subscription.controller'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeCancelSubscriptionsController(): Controller {
  const prismaSubscriptionsRepository = new PrismaSubscriptionsRepository()
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCaseCancelSubscription = new CancelSubscription(
    prismaSubscriptionsRepository,
    prismaUsersRepository,
  )

  const validator = new ValidatorCompositor([])

  return new CancelSubscriptionController(validator, useCaseCancelSubscription)
}
