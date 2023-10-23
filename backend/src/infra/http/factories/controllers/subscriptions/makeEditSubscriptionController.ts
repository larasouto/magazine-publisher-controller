import { PrismaMagazinesRepository } from '@/application/magazines/repositories/prisma/PrismaMagazinesRepository'
import { PrismaSubscriptionsRepository } from '@/application/subscriptions/repositories/prisma/PrismaSubscriptionsRepository'
import { EditSubscription } from '@/application/subscriptions/use-cases/edit-subscription/edit-subscription'
import { EditSubscriptionController } from '@/application/subscriptions/use-cases/edit-subscription/edit-subscription.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeEditSubscriptionsController(): Controller {
  const prismaSubscriptionsRepository = new PrismaSubscriptionsRepository()
  const prismaMagazinesRepository = new PrismaMagazinesRepository()
  const useCaseEditSubscription = new EditSubscription(
    prismaSubscriptionsRepository,
    prismaMagazinesRepository,
  )

  const validator = new ValidatorCompositor([])

  return new EditSubscriptionController(validator, useCaseEditSubscription)
}
