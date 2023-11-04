import { PrismaPaymentSubscriptionsRepository } from '@/application/payment-subscriptions/repositories/prisma/PrismaPaymentSubscriptions'
import { UpdateStatusPaymentSubscription } from '@/application/payment-subscriptions/use-cases/update-status-payment/update-status-payment'
import { UpdateStatusPaymentSubscriptionController } from '@/application/payment-subscriptions/use-cases/update-status-payment/update-status-payment.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeUpdateStatusSubscriptionsController(): Controller {
  const prismaPaymentSubscriptionsRepository =
    new PrismaPaymentSubscriptionsRepository()
  const useCaseUpdateStatusSubscription = new UpdateStatusPaymentSubscription(
    prismaPaymentSubscriptionsRepository,
  )

  const validator = new ValidatorCompositor([])

  return new UpdateStatusPaymentSubscriptionController(
    validator,
    useCaseUpdateStatusSubscription,
  )
}
