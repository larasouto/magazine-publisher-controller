import { ListAdvertisements } from '@/application/advertisements/use-cases/list-advertising/list-advertising'
import { ListAdvertisementsController } from '@/application/advertisements/use-cases/list-advertising/list-advertising.controller'
import { PrismaAdvertisementsRepository } from '@/application/editions/repositories/prisma/PrismaAdvertisementsRepository'
import { Controller } from '@/core/infra/controller'

export function makeListAdvertisementsController(): Controller {
  const prismaAdvertisementsRepository = new PrismaAdvertisementsRepository()
  const useCaseListAdvertising = new ListAdvertisements(
    prismaAdvertisementsRepository,
  )

  return new ListAdvertisementsController(useCaseListAdvertising)
}
