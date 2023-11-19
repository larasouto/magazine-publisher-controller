import { PrismaAdPricesRepository } from '@/application/ad-prices/repositories/prisma/PrismaAdPricesRepository'
import { ListAdPrices } from '@/application/ad-prices/use-cases/list-ad-price/list-ad-price'
import { ListAdPriceController } from '@/application/ad-prices/use-cases/list-ad-price/list-ad-price.controller'
import { Controller } from '@/core/infra/controller'

export function makeListAdPricesController(): Controller {
  const prismaAdPricesRepository = new PrismaAdPricesRepository()
  const useCaseListAdPrice = new ListAdPrices(prismaAdPricesRepository)

  return new ListAdPriceController(useCaseListAdPrice)
}
