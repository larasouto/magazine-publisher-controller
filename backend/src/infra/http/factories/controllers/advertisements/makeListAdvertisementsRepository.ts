import { PrismaAdvertisingRepository } from '@/application/advertisements/repositories/prisma/PrismaAdvertisementsRepository'
import { ListAdvertisements } from '@/application/advertisements/use-cases/list-advertising/list-advertising'
import { ListAdvertisementsController } from '@/application/advertisements/use-cases/list-advertising/list-advertising.controller'
import { Controller } from '@/core/infra/controller'

export function makeListAdvertisementsController(): Controller {
  const prismaAdvertisementsRepository = new PrismaAdvertisingRepository()
  const useCaseListAdvertising = new ListAdvertisements(
    prismaAdvertisementsRepository,
  )

  return new ListAdvertisementsController(useCaseListAdvertising)
}
