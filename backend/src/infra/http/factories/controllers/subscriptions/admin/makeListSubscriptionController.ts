import { PrismaSubscriptionsRepository } from '@/application/subscriptions/admin/repositories/prisma/PrismaSubscriptionsRepository'
import { ListSubscriptions } from '@/application/subscriptions/admin/use-cases/list-subscription/list-subscriptions'
import { ListSubscriptionsController } from '@/application/subscriptions/admin/use-cases/list-subscription/list-subscriptions.controller'
import { Controller } from '@/core/infra/controller'

export function makeListSubscriptionsController(): Controller {
  const prismaSubscriptionsRepository = new PrismaSubscriptionsRepository()
  const useCaseListSubscription = new ListSubscriptions(
    prismaSubscriptionsRepository,
  )

  return new ListSubscriptionsController(useCaseListSubscription)
}
