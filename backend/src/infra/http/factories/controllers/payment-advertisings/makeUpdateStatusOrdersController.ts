import { PrismaPaymentAdvertisingsRepository } from '@/application/payment-advertisings/repositories/prisma/PrismaPaymentAdvertisingsRepository'
import { UpdateStatusPaymentAdvertising } from '@/application/payment-advertisings/use-cases/update-status-payment/update-status-payment'
import { UpdateStatusPaymentAdvertisingController } from '@/application/payment-advertisings/use-cases/update-status-payment/update-status-payment.controller'

import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeUpdateStatusAdvertisingsController(): Controller {
  const prismaPaymentAdvertisingsRepository =
    new PrismaPaymentAdvertisingsRepository()
  const useCaseUpdateStatusAdvertising = new UpdateStatusPaymentAdvertising(
    prismaPaymentAdvertisingsRepository,
  )

  const validator = new ValidatorCompositor([])

  return new UpdateStatusPaymentAdvertisingController(
    validator,
    useCaseUpdateStatusAdvertising,
  )
}
