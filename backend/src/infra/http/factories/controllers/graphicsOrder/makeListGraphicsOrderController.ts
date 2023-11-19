import { PrismaGraphicsOrdersRepository } from '@/application/graphicsOrder/repositories/prisma/PrismaGraphicsOrderRepository'
import { ListGraphicsOrder } from '@/application/graphicsOrder/use-case/list-order/list-graphicsOrder'
import { ListGraphicsOrderController } from '@/application/graphicsOrder/use-case/list-order/list-graphicsOrder.controller'
import { Controller } from '@/core/infra/controller'

export function makeListGraphicsOrderController(): Controller {
  const prismaGraphicsOrderRepository = new PrismaGraphicsOrdersRepository()
  const useCaseListGraphicsOrder = new ListGraphicsOrder(prismaGraphicsOrderRepository)

  return new ListGraphicsOrderController(useCaseListGraphicsOrder)
}
