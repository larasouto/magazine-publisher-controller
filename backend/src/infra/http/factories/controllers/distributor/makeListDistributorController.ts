import { PrismaDistributorRepository } from '@/application/distributor/repositories/Prisma/PrismaDistributorRepository'
import { ListDistributor } from '@/application/distributor/use-case/list-distributor/list-distributor'
import { ListDistributorController } from '@/application/distributor/use-case/list-distributor/list-distributor.controller'
import { Controller } from '@/core/infra/controller'

export function makeListDistributorController(): Controller {
  const prismaDistributorRepository = new PrismaDistributorRepository()
  const useCaseListDistributor = new ListDistributor(
    prismaDistributorRepository,
  )

  return new ListDistributorController(useCaseListDistributor)
}
