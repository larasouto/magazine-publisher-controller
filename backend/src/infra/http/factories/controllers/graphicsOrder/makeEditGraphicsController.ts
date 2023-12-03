

import { PrismaGraphicsOrdersRepository } from '@/application/graphicsOrder/repositories/prisma/PrismaGraphicsOrderRepository'
import { EditGraphicsOrder } from '@/application/graphicsOrder/use-case/edit-order/edit-graphicsOrder'
import { EditGraphicsOrderController } from '@/application/graphicsOrder/use-case/edit-order/edit-graphicsOrder.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeEditGraphicsOrderController(): Controller {
  const prismaGraphicsOrderRepository = new PrismaGraphicsOrdersRepository()
  const useCaseEditGraphicsOrder = new EditGraphicsOrder(prismaGraphicsOrderRepository)

  const validator = new ValidatorCompositor([])

  return new EditGraphicsOrderController(validator, useCaseEditGraphicsOrder)
}
