import { PrismaOrderReturnsRepository } from '@/application/orderReturn/repositories/prisma/PrismaOrderReturnsRepository'
import { CreateOrderReturn } from '@/application/orderReturn/use-case/create-orderReturn/create-orderReturn'
import { CreateOrderReturnController } from '@/application/orderReturn/use-case/create-orderReturn/create-orderReturn.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeCreateOrderReturnController(): Controller {
  const prismaOrderReturnsRepository = new PrismaOrderReturnsRepository()
  const useCaseCreateOrderReturn = new CreateOrderReturn(
    prismaOrderReturnsRepository,
  )
  

  const validator = new ValidatorCompositor([])

  return new CreateOrderReturnController(validator, useCaseCreateOrderReturn)
}
