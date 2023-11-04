import { PrismaOrdersRepository } from '@/application/orders/repositories/prisma/PrismaOrdersRepository'
import { UpdateStatusOrder } from '@/application/orders/use-cases/update-status-order/update-status-order'
import { UpdateStatusOrderController } from '@/application/orders/use-cases/update-status-order/update-status-order.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeUpdateStatusOrdersController(): Controller {
  const prismaOrdersRepository = new PrismaOrdersRepository()
  const useCaseUpdateStatusOrder = new UpdateStatusOrder(prismaOrdersRepository)

  const validator = new ValidatorCompositor([])

  return new UpdateStatusOrderController(validator, useCaseUpdateStatusOrder)
}
