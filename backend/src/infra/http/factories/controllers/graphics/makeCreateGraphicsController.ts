import { PrismaGraphicsRepository } from '@/application/graphics/repositories/Prisma/PrismaGraphicsRepository'
import { CreateGraphics } from '@/application/graphics/use-case/create-graphics/create-graphics'
import { CreateGraphicsController } from '@/application/graphics/use-case/create-graphics/create-graphics.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeCreateGraphicsController(): Controller {
  const prismaGraphicssRepository = new PrismaGraphicsRepository()
  const useCaseCreateGraphics = new CreateGraphics(prismaGraphicssRepository)

  const validator = new ValidatorCompositor([])

  return new CreateGraphicsController(validator, useCaseCreateGraphics)
}
