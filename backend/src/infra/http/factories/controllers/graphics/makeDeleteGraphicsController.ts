import { PrismaGraphicsRepository } from '@/application/graphics/repositories/Prisma/PrismaGraphicsRepository'
import { DeleteGraphics } from '@/application/graphics/use-case/delete-graphcs/delete-graphics'
import { DeleteGraphicsontroller } from '@/application/graphics/use-case/delete-graphcs/delete-graphics.controller'

import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeDeleteGraphicsController(): Controller {
  const prismaGraphicsRepository = new PrismaGraphicsRepository()
  const useCaseDeleteGraphics = new DeleteGraphics(prismaGraphicsRepository)

  const validator = new ValidatorCompositor([])

  return new DeleteGraphicsontroller(validator, useCaseDeleteGraphics)
}
