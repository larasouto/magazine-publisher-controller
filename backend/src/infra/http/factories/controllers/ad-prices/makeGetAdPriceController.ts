import { PrismaAdPricesRepository } from '@/application/ad-prices/repositories/prisma/PrismaAdPricesRepository'
import { GetAdPrice } from '@/application/ad-prices/use-cases/get-ad-price/get-ad-price'
import { GetAdPriceController } from '@/application/ad-prices/use-cases/get-ad-price/get-ad-price.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeGetAdPriceController(): Controller {
  const prismaAdPricesRepository = new PrismaAdPricesRepository()
  const useCaseGetAdPrice = new GetAdPrice(prismaAdPricesRepository)

  const validator = new ValidatorCompositor([])

  return new GetAdPriceController(validator, useCaseGetAdPrice)
}
