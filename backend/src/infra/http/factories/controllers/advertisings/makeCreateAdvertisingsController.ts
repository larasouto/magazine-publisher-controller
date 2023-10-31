import { PrismaAdvertisingsRepository } from '@/application/advertisings/repositories/prisma/PrismaAdvertisingsRepository'
import { CreateAdvertising } from '@/application/advertisings/use-cases/create-advertising/create-advertising'
import { CreateAdvertisingController } from '@/application/advertisings/use-cases/create-advertising/create-advertising.controller'
import { PrismaMagazinesRepository } from '@/application/magazines/repositories/prisma/PrismaMagazinesRepository'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeCreateAdvertisingsController(): Controller {
  const prismaAdvertisingsRepository = new PrismaAdvertisingsRepository()
  const prismaMagazinesRepository = new PrismaMagazinesRepository()
  const useCaseCreateAdvertising = new CreateAdvertising(
    prismaAdvertisingsRepository,
    prismaMagazinesRepository,
  )

  const validator = new ValidatorCompositor([])

  return new CreateAdvertisingController(validator, useCaseCreateAdvertising)
}
