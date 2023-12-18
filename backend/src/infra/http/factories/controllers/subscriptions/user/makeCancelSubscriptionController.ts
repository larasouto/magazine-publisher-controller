import { PrismaSubscriptionsRepository } from '@/application/subscriptions/user/repositories/prisma/PrismaSubscriptionsRepository'
import { RenewSubscription } from '@/application/subscriptions/user/use-cases/renew-subscription/renew-subscription'
import { RenewSubscriptionController } from '@/application/subscriptions/user/use-cases/renew-subscription/renew-subscription.controller'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeRenewSubscriptionsController(): Controller {
  const prismaSubscriptionsRepository = new PrismaSubscriptionsRepository()
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCaseRenewSubscription = new RenewSubscription(
    prismaSubscriptionsRepository,
    prismaUsersRepository,
  )

  const validator = new ValidatorCompositor([])

  return new RenewSubscriptionController(validator, useCaseRenewSubscription)
}
