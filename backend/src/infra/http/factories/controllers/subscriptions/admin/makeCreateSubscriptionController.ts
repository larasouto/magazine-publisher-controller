import { PrismaMagazinesRepository } from '@/application/magazines/repositories/prisma/PrismaMagazinesRepository'
import { PrismaSubscriptionsRepository } from '@/application/subscriptions/admin/repositories/prisma/PrismaSubscriptionsRepository'
import { CreateSubscription } from '@/application/subscriptions/admin/use-cases/create-subscription/create-subscription'
import { CreateSubscriptionController } from '@/application/subscriptions/admin/use-cases/create-subscription/create-subscription.controller'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeCreateSubscriptionsController(): Controller {
  const prismaSubscriptionsRepository = new PrismaSubscriptionsRepository()
  const prismaMagazinesRepository = new PrismaMagazinesRepository()
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCaseCreateSubscription = new CreateSubscription(
    prismaSubscriptionsRepository,
    prismaMagazinesRepository,
    prismaUsersRepository,
  )

  const validator = new ValidatorCompositor([])

  return new CreateSubscriptionController(validator, useCaseCreateSubscription)
}
