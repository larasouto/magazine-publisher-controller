import { PrismaAdvertisementsRepository } from '@/application/editions/repositories/prisma/PrismaAdvertisementsRepository'
import { CreateAdvertisingController } from '@/application/advertisements/use-cases/create-advertising/create-advertising.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'
import { CreateAdvertising } from '@/application/advertisements/use-cases/create-advertising/create-advertising'

export function makeCreateAdvertisementsController(): Controller {
  const prismaAdvertisementsRepository = new PrismaAdvertisementsRepository()
  const useCaseCreateAdvertising = new CreateAdvertising(
    prismaAdvertisementsRepository,
  )

  const validator = new ValidatorCompositor([])

  return new CreateAdvertisingController(validator, useCaseCreateAdvertising)
}
