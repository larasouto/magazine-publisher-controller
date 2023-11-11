import { PrismaGraphicsOrdersRepository } from '@/application/graphicsOrder/repositories/prisma/PrismaGraphicsOrderRepository'
import { GetGraphicsOrder } from '@/application/graphicsOrder/use-case/get-order/get-graphicsOrder'
import { GetGraphicsOrderController } from '@/application/graphicsOrder/use-case/get-order/get-graphicsOrder.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeGetGraphicsOrderController(): Controller {
  const prismaGraphicsOrderRepository = new PrismaGraphicsOrdersRepository()
  const useCaseGetGraphicsOrder = new GetGraphicsOrder(
    prismaGraphicsOrderRepository,
  )

  const validator = new ValidatorCompositor([])

  return new GetGraphicsOrderController(validator, useCaseGetGraphicsOrder)
}
