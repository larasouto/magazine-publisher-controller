
import { PrismaOrdersRepository } from '@/application/order/repositories/prisma/PrismaOrderRepository'
import { CreateOrderController } from '@/application/order/use-case/create-order/crate-order.controller'
import { CreateOrder } from '@/application/order/use-case/create-order/create-order'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeCreateOrderController(): Controller {
  const prismaOrderRepository = new PrismaOrdersRepository()
  const useCaseCreateOrder = new CreateOrder(prismaOrderRepository)

  const validator = new ValidatorCompositor([])

  return new CreateOrderController(validator, useCaseCreateOrder)
}
