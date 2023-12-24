import { PrismaGraphicsRepository } from '@/application/graphics/repositories/prisma/PrismaGraphicsRepository'
import { DeleteGraphic } from '@/application/graphics/use-case/delete-graphics/delete-graphics'
import { DeleteGraphicController } from '@/application/graphics/use-case/delete-graphics/delete-graphics.controller'

import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeDeleteGraphicsController(): Controller {
  const prismaGraphicsRepository = new PrismaGraphicsRepository()
  const useCaseDeleteGraphics = new DeleteGraphic(prismaGraphicsRepository)

  const validator = new ValidatorCompositor([])

  return new DeleteGraphicController(validator, useCaseDeleteGraphics)
}
