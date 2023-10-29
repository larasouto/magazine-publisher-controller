import { PrismaOrderReturnsRepository } from '@/application/orderReturn/repositories/prisma/PrismaOrderReturnsRepository'
import { GetOrderReturnController } from '@/application/orderReturn/use-case/get_orderReturn/get-orderReturn.controller'
import { GetOrderReturn } from '@/application/orderReturn/use-case/get_orderReturn/get-orderReturn'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeGetOrderReturnController(): Controller {
  const prismaOrderReturnRepository = new PrismaOrderReturnsRepository()
  const useCaseGetOrderReturn = new GetOrderReturn(prismaOrderReturnRepository)

  const validator = new ValidatorCompositor([])

  return new GetOrderReturnController(validator, useCaseGetOrderReturn)
}
