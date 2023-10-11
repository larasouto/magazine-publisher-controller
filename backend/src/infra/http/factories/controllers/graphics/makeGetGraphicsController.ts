import { PrismaGraphicsRepository } from '@/application/graphics/repositories/Prisma/PrismaGraphicsRepository'
import { GetGraphics } from '@/application/graphics/use-case/get-theme/get-graphics'
import { GetGraphicsController } from '@/application/graphics/use-case/get-theme/get-graphics.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeGetGraphicsController(): Controller {
  const prismaGraphicsRepository = new PrismaGraphicsRepository()
  const useCaseGetGraphics = new GetGraphics(prismaGraphicsRepository)

  const validator = new ValidatorCompositor([])

  return new GetGraphicsController(validator, useCaseGetGraphics)
}
