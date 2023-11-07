import { PrismaGraphicsRepository } from '@/application/graphics/repositories/Prisma/PrismaGraphicsRepository'
import { EditGraphics } from '@/application/graphics/use-case/edit-graphics/edit-graphics'
import { EditGraphicsController } from '@/application/graphics/use-case/edit-graphics/edit-graphics.controller'

import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeEditGraphicsController(): Controller {
  const prismaGraphicsRepository = new PrismaGraphicsRepository()
  const useCaseEditGraphics = new EditGraphics(prismaGraphicsRepository)

  const validator = new ValidatorCompositor([])

  return new EditGraphicsController(validator, useCaseEditGraphics)
}
