import { PrismaDistributorRepository } from '@/application/distributors/repositories/prisma/PrismaDistributorRepository'
import { ListDistributor } from '@/application/distributors/use-case/list-distributor/list-distributor'
import { ListDistributorController } from '@/application/distributors/use-case/list-distributor/list-distributor.controller'
import { Controller } from '@/core/infra/controller'

export function makeListDistributorController(): Controller {
  const prismaDistributorRepository = new PrismaDistributorRepository()
  const useCaseListDistributor = new ListDistributor(
    prismaDistributorRepository,
  )

  return new ListDistributorController(useCaseListDistributor)
}
