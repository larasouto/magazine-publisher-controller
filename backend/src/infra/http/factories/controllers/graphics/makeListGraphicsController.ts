import { PrismaGraphicsRepository } from '@/application/graphics/repositories/Prisma/PrismaGraphicsRepository'
import { ListGraphics } from '@/application/graphics/use-case/list-graphics/list-graphics'
import { ListGraphicsController } from '@/application/graphics/use-case/list-graphics/list-graphics.controller'
import { Controller } from '@/core/infra/controller'

export function makeListGraphicsController(): Controller {
  const prismaGraphicsRepository = new PrismaGraphicsRepository()
  const useCaseListGraphics = new ListGraphics(prismaGraphicsRepository)

  return new ListGraphicsController(useCaseListGraphics)
}
