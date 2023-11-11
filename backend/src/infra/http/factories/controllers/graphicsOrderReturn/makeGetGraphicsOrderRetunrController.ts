import { PrismaGraphicsOrderReturnsRepository } from '@/application/graphicsOrderReturn/repositories/prisma/PrismaGraphicsOrderReturnsRepository'
import { GetGraphicsOrderReturn } from '@/application/graphicsOrderReturn/use-case/get_orderReturn/get-graphicsOrderReturn'
import { GetGraphicsOrderReturnController } from '@/application/graphicsOrderReturn/use-case/get_orderReturn/get-graphicsOrderReturn.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeGetGraphicsOrderReturnController(): Controller {
  const prismaGraphicsOrderReturnRepository = new PrismaGraphicsOrderReturnsRepository()
  const useCaseGetGraphicsOrderReturn = new GetGraphicsOrderReturn(
    prismaGraphicsOrderReturnRepository,
  )

  const validator = new ValidatorCompositor([])

  return new GetGraphicsOrderReturnController(validator, useCaseGetGraphicsOrderReturn)
}
