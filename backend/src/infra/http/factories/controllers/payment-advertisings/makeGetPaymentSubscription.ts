import { PrismaPaymentAdvertisingsRepository } from '@/application/payment-advertisings/repositories/prisma/PrismaPaymentAdvertisingsRepository'
import { GetPayment } from '@/application/payment-advertisings/use-cases/get-payment-advertising/get-payment'
import { GetPaymentAdvertisingController } from '@/application/payment-advertisings/use-cases/get-payment-advertising/get-payment.controller'

import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeGetPaymentAdvertisingController(): Controller {
  const prismaPaymentAdvertisingRepository =
    new PrismaPaymentAdvertisingsRepository()
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCaseGetPaymentAdvertising = new GetPayment(
    prismaPaymentAdvertisingRepository,
    prismaUsersRepository,
  )

  const validator = new ValidatorCompositor([])

  return new GetPaymentAdvertisingController(
    validator,
    useCaseGetPaymentAdvertising,
  )
}
