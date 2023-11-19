import { PrismaGraphicsOrderReturnsRepository } from "@/application/graphicsOrderReturn/repositories/prisma/PrismaGraphicsOrderReturnsRepository"
import { CreateGraphicsOrderReturn } from "@/application/graphicsOrderReturn/use-case/create-orderReturn/create-graphicsOrderReturn"
import { CreateGraphicsOrderReturnController } from "@/application/graphicsOrderReturn/use-case/create-orderReturn/create-graphicsOrderReturn.controller"
import { Controller } from "@/core/infra/controller"
import { ValidatorCompositor } from "@/infra/validation/ValidatorCompositor"

export function makeCreateGraphicsOrderReturnController(): Controller {
  const prismaGraphicsOrderReturnRepository = new PrismaGraphicsOrderReturnsRepository()
  const useCaseCreateGraphicsOrderReturn = new CreateGraphicsOrderReturn(prismaGraphicsOrderReturnRepository)

  const validator = new ValidatorCompositor([])

  return new CreateGraphicsOrderReturnController(validator, useCaseCreateGraphicsOrderReturn)
}
