
import { PrismaOrderReturnsRepository } from '@/application/orderReturn/repositories/prisma/PrismaOrderReturnsRepository'
import { ListOrderReturn } from '@/application/orderReturn/use-case/list_orderRetur/list-orderReturn'
import { ListOrderReturnController } from '@/application/orderReturn/use-case/list_orderRetur/list-orderReturn.controller'
import { Controller } from '@/core/infra/controller'

export function makeListOrderReturnController(): Controller {
  const prismaOrderReturnRepository = new PrismaOrderReturnsRepository()
  const useCaseListOrderReturn = new ListOrderReturn(prismaOrderReturnRepository)

  return new ListOrderReturnController(useCaseListOrderReturn)
}
