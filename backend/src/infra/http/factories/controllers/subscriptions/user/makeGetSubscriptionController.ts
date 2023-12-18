import { PrismaSubscriptionsRepository } from '@/application/subscriptions/user/repositories/prisma/PrismaSubscriptionsRepository'
import { GetSubscriptionController } from '@/application/subscriptions/user/use-cases/get-subscription/get-subscription.controller'
import { GetSubscription } from '@/application/subscriptions/user/use-cases/get-subscription/get-subscription'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { Controller } from '@/core/infra/controller'
import { RequiredFieldsValidator } from '@/infra/validation/RequiredFieldsValidator'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

type Validate = {
  subscriptionId: string
}

export function makeGetSubscriptionController(): Controller {
  const prismaSubscriptionsRepository = new PrismaSubscriptionsRepository()
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCaseGetSubscription = new GetSubscription(
    prismaSubscriptionsRepository,
    prismaUsersRepository,
  )

  const validator = new ValidatorCompositor<Validate>([
    new RequiredFieldsValidator(),
  ])

  return new GetSubscriptionController(validator, useCaseGetSubscription)
}
