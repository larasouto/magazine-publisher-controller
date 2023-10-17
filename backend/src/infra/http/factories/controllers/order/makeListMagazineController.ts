import { PrismaOrdersRepository } from '@/application/order/repositories/prisma/PrismaOrderRepository'
import { ListOrder } from '@/application/order/use-case/list-order/list-order'
import { ListOrderController } from '@/application/order/use-case/list-order/list-order.controller'
import { Controller } from '@/core/infra/controller'

export function makeListOrderController(): Controller {
  const prismaOrderRepository = new PrismaOrdersRepository()
  const useCaseListOrder = new ListOrder(prismaOrderRepository)

  return new ListOrderController(useCaseListOrder)
}
