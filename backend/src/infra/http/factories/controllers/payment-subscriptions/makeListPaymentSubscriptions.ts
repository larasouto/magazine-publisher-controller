import { PrismaPaymentSubscriptionsRepository } from '@/application/payment-subscriptions/repositories/prisma/PrismaPaymentSubscriptions'
import { ListPayments } from '@/application/payment-subscriptions/use-cases/list-payment/list-payment'
import { ListPaymentsController } from '@/application/payment-subscriptions/use-cases/list-payment/list-payment.controller'
import { Controller } from '@/core/infra/controller'

export function makeListPaymentSubscriptionsController(): Controller {
  const prismaPaymentSubscriptionsRepository =
    new PrismaPaymentSubscriptionsRepository()
  const useCaseListPaymentSubscription = new ListPayments(
    prismaPaymentSubscriptionsRepository,
  )

  return new ListPaymentsController(useCaseListPaymentSubscription)
}
