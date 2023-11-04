import { PrismaPaymentSubscriptionsRepository } from '@/application/payment-subscriptions/repositories/prisma/PrismaPaymentSubscriptions'
import { GetPayment } from '@/application/payment-subscriptions/use-cases/get-payment-subscriptions/get-payment'
import { GetPaymentSubscriptionController } from '@/application/payment-subscriptions/use-cases/get-payment-subscriptions/get-payment.controller'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeGetPaymentSubscriptionController(): Controller {
  const prismaPaymentSubscriptionsRepository =
    new PrismaPaymentSubscriptionsRepository()
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCaseGetPaymentSubscription = new GetPayment(
    prismaPaymentSubscriptionsRepository,
    prismaUsersRepository,
  )

  const validator = new ValidatorCompositor([])

  return new GetPaymentSubscriptionController(
    validator,
    useCaseGetPaymentSubscription,
  )
}
