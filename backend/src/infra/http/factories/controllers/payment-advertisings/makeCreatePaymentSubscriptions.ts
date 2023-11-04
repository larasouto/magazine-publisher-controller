import { PrismaAddressesRepository } from '@/application/addresses/repositories/prisma/PrismaAddressesRepository'
import { PrismaCardsRepository } from '@/application/cards/repositories/prisma/PrismaCardsRepository'

import { PrismaAdvertisingsRepository } from '@/application/advertisings/repositories/prisma/PrismaAdvertisingsRepository'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'
import { PrismaPaymentAdvertisingsRepository } from '@/application/payment-advertisings/repositories/prisma/PrismaPaymentAdvertisingsRepository'
import { CreatePaymentAdvertising } from '@/application/payment-advertisings/use-cases/payment-advertising/payment-advertising'
import { CreatePaymentAdvertisingController } from '@/application/payment-advertisings/use-cases/payment-advertising/payment-advertising.controller'

export function makeCreatePaymentAdvertisingsController(): Controller {
  const prismaPaymentAdvertisingsRepository =
    new PrismaPaymentAdvertisingsRepository()
  const prismaUsersRepository = new PrismaUsersRepository()
  const prismaAddressesRepository = new PrismaAddressesRepository()
  const prismaAdvertisingsRepository = new PrismaAdvertisingsRepository()
  const prismaCardsRepository = new PrismaCardsRepository()
  const useCaseCreatePaymentAdvertising = new CreatePaymentAdvertising(
    prismaPaymentAdvertisingsRepository,
    prismaUsersRepository,
    prismaAddressesRepository,
    prismaAdvertisingsRepository,
    prismaCardsRepository,
  )

  const validator = new ValidatorCompositor([])

  return new CreatePaymentAdvertisingController(
    validator,
    useCaseCreatePaymentAdvertising,
  )
}
