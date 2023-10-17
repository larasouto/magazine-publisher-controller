
import { PrismaOrdersRepository } from '@/application/order/repositories/prisma/PrismaOrderRepository'
import { GetOrder } from '@/application/order/use-case/get-order/get-order'
import { GetOrderController } from '@/application/order/use-case/get-order/get-order.controller'
import { Controller } from '@/core/infra/controller'
import { RequiredFieldsValidator } from '@/infra/validation/RequiredFieldsValidator'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

type Validate = {
  photographerId: string
}

export function makeGetOrderController(): Controller {
  const prismaOrdersRepository = new PrismaOrdersRepository()
  const useCaseGetOrder = new GetOrder(
    prismaOrdersRepository,
  )

  const validator = new ValidatorCompositor<Validate>([
    new RequiredFieldsValidator(),
  ])

  return new GetOrderController(validator, useCaseGetOrder)
}
