import { PrismaGraphicsOnDistributorRepository } from '@/application/graphicsOnDistributor/repositories/Prisma/PrismaGraphicsOnDistributorRepository'
import { CreateGraphicsOnDistributor } from '@/application/graphicsOnDistributor/use-case/create-graphicsOnDistributor/create-graphicsOnDistributor'
import { CreateGraphicsOnDistributorController } from '@/application/graphicsOnDistributor/use-case/create-graphicsOnDistributor/create-graphicsOnDistributor.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeCreateGraphicsOnDistributorController(): Controller {
  const prismaGraphicsOnDistributorsRepository = new PrismaGraphicsOnDistributorRepository()
  const useCaseCreateGraphicsOnDistributor = new CreateGraphicsOnDistributor(prismaGraphicsOnDistributorsRepository)

  const validator = new ValidatorCompositor([])

  return new CreateGraphicsOnDistributorController(validator, useCaseCreateGraphicsOnDistributor)
}
