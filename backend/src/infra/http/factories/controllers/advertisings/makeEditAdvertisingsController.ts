import { PrismaAdvertisingsRepository } from '@/application/advertisings/repositories/prisma/PrismaAdvertisingsRepository'
import { EditAdvertising } from '@/application/advertisings/use-cases/edit-advertising/edit-advertising'
import { EditAdvertisingController } from '@/application/advertisings/use-cases/edit-advertising/edit-advertising.controller'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeEditAdvertisingsController(): Controller {
  const prismaAdvertisingsRepository = new PrismaAdvertisingsRepository()
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCaseEditAdvertising = new EditAdvertising(
    prismaAdvertisingsRepository,
    prismaUsersRepository,
  )

  const validator = new ValidatorCompositor([])

  return new EditAdvertisingController(validator, useCaseEditAdvertising)
}
