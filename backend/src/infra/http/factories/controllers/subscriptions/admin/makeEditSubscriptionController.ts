import { PrismaMagazinesRepository } from '@/application/magazines/repositories/prisma/PrismaMagazinesRepository'
import { PrismaSubscriptionsRepository } from '@/application/subscriptions/admin/repositories/prisma/PrismaSubscriptionsRepository'
import { EditSubscription } from '@/application/subscriptions/admin/use-cases/edit-subscription/edit-subscription'
import { EditSubscriptionController } from '@/application/subscriptions/admin/use-cases/edit-subscription/edit-subscription.controller'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeEditSubscriptionsController(): Controller {
  const prismaSubscriptionsRepository = new PrismaSubscriptionsRepository()
  const prismaMagazinesRepository = new PrismaMagazinesRepository()
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCaseEditSubscription = new EditSubscription(
    prismaSubscriptionsRepository,
    prismaMagazinesRepository,
    prismaUsersRepository,
  )

  const validator = new ValidatorCompositor([])

  return new EditSubscriptionController(validator, useCaseEditSubscription)
}
