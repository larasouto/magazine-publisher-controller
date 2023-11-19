
import { PrismaGraphicsOnDistributorRepository } from '@/application/graphicsOnDistributor/repositories/Prisma/PrismaGraphicsOnDistributorRepository'
import { ListGraphicsOnDistributor } from '@/application/graphicsOnDistributor/use-case/list-graphicsOnDistributor/list-graphicsOnDistributor'
import { ListGraphicsOnDistributorController } from '@/application/graphicsOnDistributor/use-case/list-graphicsOnDistributor/list-graphicsOnDistributor.controller'
import { Controller } from '@/core/infra/controller'

export function makeListGraphicsOnDistributorController(): Controller {
  const prismaGraphicsOnDistributorRepository = new PrismaGraphicsOnDistributorRepository()
  const useCaseListGraphicsOnDistributor = new ListGraphicsOnDistributor(prismaGraphicsOnDistributorRepository)

  return new ListGraphicsOnDistributorController(useCaseListGraphicsOnDistributor)
}
