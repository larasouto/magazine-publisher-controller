import { PrismaSubscriptionsRepository } from '@/application/subscriptions/user/repositories/prisma/PrismaSubscriptionsRepository'
import { ListSubscriptions } from '@/application/subscriptions/user/use-cases/list-subscriptions/list-subscriptions'
import { ListSubscriptionsController } from '@/application/subscriptions/user/use-cases/list-subscriptions/list-subscriptions.controller'
import { Controller } from '@/core/infra/controller'

export function makeListSubscriptionsController(): Controller {
  const prismaSubscriptionsRepository = new PrismaSubscriptionsRepository()
  const useCaseListSubscription = new ListSubscriptions(
    prismaSubscriptionsRepository,
  )

  return new ListSubscriptionsController(useCaseListSubscription)
}
