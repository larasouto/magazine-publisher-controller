import { PrismaMagazinesRepository } from '@/application/magazines/repositories/prisma/PrismaMagazinesRepository'
import { PrismaSubscriptionsRepository } from '@/application/subscriptions/repositories/prisma/PrismaSubscriptionsRepository'
import { CreateSubscription } from '@/application/subscriptions/use-cases/create-subscription/create-subscription'
import { CreateSubscriptionController } from '@/application/subscriptions/use-cases/create-subscription/create-subscription.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeCreateSubscriptionsController(): Controller {
  const prismaSubscriptionsRepository = new PrismaSubscriptionsRepository()
  const prismaMagazinesRepository = new PrismaMagazinesRepository()
  const useCaseCreateSubscription = new CreateSubscription(
    prismaSubscriptionsRepository,
    prismaMagazinesRepository,
  )

  const validator = new ValidatorCompositor([])

  return new CreateSubscriptionController(validator, useCaseCreateSubscription)
}
