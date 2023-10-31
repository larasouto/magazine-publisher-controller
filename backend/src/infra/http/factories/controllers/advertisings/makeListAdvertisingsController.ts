import { PrismaAdvertisingsRepository } from '@/application/advertisings/repositories/prisma/PrismaAdvertisingsRepository'
import { ListAdvertisings } from '@/application/advertisings/use-cases/list-advertising/list-advertising'
import { ListAdvertisingController } from '@/application/advertisings/use-cases/list-advertising/list-advertising.controller'
import { Controller } from '@/core/infra/controller'

export function makeListAdvertisingsController(): Controller {
  const prismaAdvertisingsRepository = new PrismaAdvertisingsRepository()
  const useCaseListAdvertising = new ListAdvertisings(
    prismaAdvertisingsRepository,
  )

  return new ListAdvertisingController(useCaseListAdvertising)
}
