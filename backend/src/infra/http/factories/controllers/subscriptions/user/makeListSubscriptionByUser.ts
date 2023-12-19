import { PrismaSubscriptionsRepository } from '@/application/subscriptions/user/repositories/prisma/PrismaSubscriptionsRepository'
import { ListSubscriptions } from '@/application/subscriptions/user/use-cases/list-subscriptions-by-user/list-subscription'
import { ListSubscriptionsController } from '@/application/subscriptions/user/use-cases/list-subscriptions-by-user/list-subscription.controller'
import { Controller } from '@/core/infra/controller'

export function makeListSubscriptionsByUserController(): Controller {
  const prismaSubscriptionsRepository = new PrismaSubscriptionsRepository()
  const useCaseListSubscription = new ListSubscriptions(
    prismaSubscriptionsRepository,
  )

  return new ListSubscriptionsController(useCaseListSubscription)
}
