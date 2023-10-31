import { PrismaAdvertisingsRepository } from '@/application/advertisings/repositories/prisma/PrismaAdvertisingsRepository'
import { GetAdvertising } from '@/application/advertisings/use-cases/get-advertising/get-advertising'
import { GetAdvertisingController } from '@/application/advertisings/use-cases/get-advertising/get-advertising.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeGetAdvertisingController(): Controller {
  const prismaAdvertisingsRepository = new PrismaAdvertisingsRepository()
  const useCaseGetAdvertising = new GetAdvertising(prismaAdvertisingsRepository)

  const validator = new ValidatorCompositor([])

  return new GetAdvertisingController(validator, useCaseGetAdvertising)
}
