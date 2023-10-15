import { PrismaDistributorRepository } from '@/application/distributor/repositories/Prisma/PrismaDistributorRepository'
import { DeleteDistributor } from '@/application/distributor/use-case/delete-distributor/delete-distributor'
import { DeleteDistributorontroller } from '@/application/distributor/use-case/delete-distributor/delete-distributor.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeDeleteDistributorController(): Controller {
  const prismaDistributorRepository = new PrismaDistributorRepository()
  const useCaseDeleteDistributor = new DeleteDistributor(
    prismaDistributorRepository,
  )

  const validator = new ValidatorCompositor([])

  return new DeleteDistributorontroller(validator, useCaseDeleteDistributor)
}
