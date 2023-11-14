import { PrismaAdvertisingsRepository } from '@/application/advertisings/repositories/prisma/PrismaAdvertisingsRepository'
import { UpdateStatusAdvertising } from '@/application/advertisings/use-cases/update-status/update-status'
import { UpdateStatusAdvertisingController } from '@/application/advertisings/use-cases/update-status/update-status.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeUpdateStatusAdvertisingsController(): Controller {
  const prismaAdvertisingsRepository = new PrismaAdvertisingsRepository()
  const useCaseUpdateStatusAdvertising = new UpdateStatusAdvertising(
    prismaAdvertisingsRepository,
  )

  const validator = new ValidatorCompositor([])

  return new UpdateStatusAdvertisingController(
    validator,
    useCaseUpdateStatusAdvertising,
  )
}
