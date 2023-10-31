import { PrismaPaymentAdvertisingsRepository } from '@/application/payment-advertisings/repositories/prisma/PrismaPaymentAdvertisingsRepository'
import { ListPayments } from '@/application/payment-advertisings/use-cases/list-payment/list-payment'
import { ListPaymentsController } from '@/application/payment-advertisings/use-cases/list-payment/list-payment.controller'
import { Controller } from '@/core/infra/controller'

export function makeListPaymentAdvertisingsController(): Controller {
  const prismaPaymentAdvertisingsRepository =
    new PrismaPaymentAdvertisingsRepository()
  const useCaseListPaymentAdvertising = new ListPayments(
    prismaPaymentAdvertisingsRepository,
  )

  return new ListPaymentsController(useCaseListPaymentAdvertising)
}
