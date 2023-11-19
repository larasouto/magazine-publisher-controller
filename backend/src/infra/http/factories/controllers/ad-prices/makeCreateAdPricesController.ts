import { PrismaAdPricesRepository } from '@/application/ad-prices/repositories/prisma/PrismaAdPricesRepository'
import { CreateAdPrice } from '@/application/ad-prices/use-cases/create-ad-price/create-ad-prices'
import { CreateAdPriceController } from '@/application/ad-prices/use-cases/create-ad-price/create-ad-prices.controller'
import { PrismaMagazinesRepository } from '@/application/magazines/repositories/prisma/PrismaMagazinesRepository'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeCreateAdPricesController(): Controller {
  const prismaAdPricesRepository = new PrismaAdPricesRepository()
  const prismaMagazinesRepository = new PrismaMagazinesRepository()
  const useCaseCreateAdPrice = new CreateAdPrice(
    prismaAdPricesRepository,
    prismaMagazinesRepository,
  )

  const validator = new ValidatorCompositor([])

  return new CreateAdPriceController(validator, useCaseCreateAdPrice)
}
