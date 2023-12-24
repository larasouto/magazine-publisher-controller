import { PrismaSubscriptionsRepository } from '@/application/subscriptions/user/repositories/prisma/PrismaSubscriptionsRepository'
import { ListSubscriptionsByUser } from '@/application/subscriptions/user/use-cases/list-subscriptions-by-user/list-subscription'
import { ListSubscriptionsController } from '@/application/subscriptions/user/use-cases/list-subscriptions-by-user/list-subscription.controller'
import { Controller } from '@/core/infra/controller'

export function makeListSubscriptionsByUserController(): Controller {
  const prismaSubscriptionsRepository = new PrismaSubscriptionsRepository()
  const useCaseListSubscription = new ListSubscriptionsByUser(
    prismaSubscriptionsRepository,
  )

  return new ListSubscriptionsController(useCaseListSubscription)
}
