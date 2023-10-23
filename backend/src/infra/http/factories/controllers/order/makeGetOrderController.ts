import { PrismaOrdersRepository } from '@/application/order/repositories/prisma/PrismaOrderRepository'
import { GetOrder } from '@/application/order/use-case/get-order/get-order'
import { GetOrderController } from '@/application/order/use-case/get-order/get-order.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeGetOrderController(): Controller {
  const prismaOrderRepository = new PrismaOrdersRepository()
  const useCaseGetOrder = new GetOrder(prismaOrderRepository)

  const validator = new ValidatorCompositor([])

  return new GetOrderController(validator, useCaseGetOrder)
}
