import { PrismaOrdersRepository } from '@/application/orders/repositories/prisma/PrismaOrdersRepository'
import { ListOrders } from '@/application/orders/use-cases/list-order/list-order'
import { ListOrderController } from '@/application/orders/use-cases/list-order/list-order.controller'

import { Controller } from '@/core/infra/controller'

export function makeListOrdersController(): Controller {
  const prismaOrdersRepository = new PrismaOrdersRepository()
  const useCaseListOrder = new ListOrders(prismaOrdersRepository)

  return new ListOrderController(useCaseListOrder)
}
