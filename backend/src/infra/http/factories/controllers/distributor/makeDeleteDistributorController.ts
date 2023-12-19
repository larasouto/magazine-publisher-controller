import { PrismaDistributorRepository } from '@/application/distributors/repositories/prisma/PrismaDistributorRepository'
import { DeleteDistributor } from '@/application/distributors/use-case/delete-distributor/delete-distributor'
import { DeleteDistributorontroller } from '@/application/distributors/use-case/delete-distributor/delete-distributor.controller'
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
