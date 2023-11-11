import { PrismaGraphicsOnDistributorRepository } from '@/application/graphicsOnDistributor/repositories/Prisma/PrismaGraphicsOnDistributorRepository'
import { GetGraphicsOnDistributor } from '@/application/graphicsOnDistributor/use-case/get-graphicsOnDistributor/get-graphicsOnDistributor'
import { GetGraphicsOnDistributorController } from '@/application/graphicsOnDistributor/use-case/get-graphicsOnDistributor/get-graphicsOnDistributor.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeGetGraphicsOnDistributorController(): Controller {
  const prismaGraphicsOnDistributorRepository = new PrismaGraphicsOnDistributorRepository()
  const useCaseGetGraphicsOnDistributor = new GetGraphicsOnDistributor(prismaGraphicsOnDistributorRepository)

  const validator = new ValidatorCompositor([])

  return new GetGraphicsOnDistributorController(validator, useCaseGetGraphicsOnDistributor)
}
