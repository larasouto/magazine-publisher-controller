import { PrismaSubscriptionsRepository } from '@/application/subscriptions/repositories/prisma/PrismaSubscriptionsRepository'
import { DeleteSubscription } from '@/application/subscriptions/use-cases/delete-subscription/delete-subscription'
import { DeleteSubscriptionController } from '@/application/subscriptions/use-cases/delete-subscription/delete-subscription.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeDeleteSubscriptionsController(): Controller {
  const prismaSubscriptionsRepository = new PrismaSubscriptionsRepository()
  const useCaseDeleteSubscription = new DeleteSubscription(prismaSubscriptionsRepository)

  const validator = new ValidatorCompositor([])

  return new DeleteSubscriptionController(validator, useCaseDeleteSubscription)
}
