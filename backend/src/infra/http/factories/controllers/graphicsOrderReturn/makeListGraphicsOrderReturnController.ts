import { PrismaGraphicsOrderReturnsRepository } from '@/application/graphicsOrderReturn/repositories/prisma/PrismaGraphicsOrderReturnsRepository'
import { ListGraphicsOrderReturn } from '@/application/graphicsOrderReturn/use-case/list_orderRetur/list-graphicsOrderReturn'
import { ListGraphicsOrderReturnnController } from '@/application/graphicsOrderReturn/use-case/list_orderRetur/list-graphicsOrderReturn.controller'
import { Controller } from '@/core/infra/controller'

export function makeListGraphicsOrderReturnController(): Controller {
  const prismaGraphicsOrderReturnRepository = new PrismaGraphicsOrderReturnsRepository()
  const useCaseListGraphicsOrderReturn = new ListGraphicsOrderReturn(prismaGraphicsOrderReturnRepository)

  return new ListGraphicsOrderReturnnController(useCaseListGraphicsOrderReturn)
}
