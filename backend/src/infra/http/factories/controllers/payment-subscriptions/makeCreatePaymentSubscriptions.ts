import { PrismaAddressesRepository } from '@/application/addresses/repositories/prisma/PrismaAddressesRepository'
import { PrismaCardsRepository } from '@/application/cards/repositories/prisma/PrismaCardsRepository'
import { PrismaPaymentSubscriptionsRepository } from '@/application/payment-subscriptions/repositories/prisma/PrismaPaymentSubscriptions'
import { CreatePaymentSubscriptionController } from '@/application/payment-subscriptions/use-cases/payment-subscriptions/payment-subscription.controller'
import { CreatePaymentSubscription } from '@/application/payment-subscriptions/use-cases/payment-subscriptions/payment-subscriptions'
import { PrismaSubscriptionsRepository } from '@/application/subscriptions/repositories/prisma/PrismaSubscriptionsRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeCreatePaymentSubscriptionsController(): Controller {
  const prismaPaymentSubscriptionsRepository =
    new PrismaPaymentSubscriptionsRepository()
  const prismaUsersRepository = new PrismaUsersRepository()
  const prismaAddressesRepository = new PrismaAddressesRepository()
  const prismaSubscriptionsRepository = new PrismaSubscriptionsRepository()
  const prismaCardsRepository = new PrismaCardsRepository()
  const useCaseCreatePaymentSubscription = new CreatePaymentSubscription(
    prismaPaymentSubscriptionsRepository,
    prismaUsersRepository,
    prismaAddressesRepository,
    prismaSubscriptionsRepository,
    prismaCardsRepository,
  )

  const validator = new ValidatorCompositor([])

  return new CreatePaymentSubscriptionController(
    validator,
    useCaseCreatePaymentSubscription,
  )
}
