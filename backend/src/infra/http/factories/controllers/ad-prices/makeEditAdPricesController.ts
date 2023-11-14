import { PrismaAdPricesRepository } from '@/application/ad-prices/repositories/prisma/PrismaAdPricesRepository'
import { EditAdPrice } from '@/application/ad-prices/use-cases/edit-advertising/edit-advertising'
import { EditAdPriceController } from '@/application/ad-prices/use-cases/edit-advertising/edit-advertising.controller'
import { PrismaMagazinesRepository } from '@/application/magazines/repositories/prisma/PrismaMagazinesRepository'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeEditAdPricesController(): Controller {
  const prismaAdPricesRepository = new PrismaAdPricesRepository()
  const prismaMagazinesRepository = new PrismaMagazinesRepository()
  const useCaseEditAdPrice = new EditAdPrice(
    prismaAdPricesRepository,
    prismaMagazinesRepository,
  )

  const validator = new ValidatorCompositor([])

  return new EditAdPriceController(validator, useCaseEditAdPrice)
}
