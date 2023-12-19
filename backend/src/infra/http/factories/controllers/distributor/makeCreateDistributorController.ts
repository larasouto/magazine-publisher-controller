import { PrismaDistributorRepository } from '@/application/distributors/repositories/prisma/PrismaDistributorRepository'
import { CreateDistributorController } from '@/application/distributors/use-case/create-distributor/create-distributor.controller'
import { CreateDistributor } from '@/application/distributors/use-case/create-distributor/create-distributor'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeCreateDistributorController(): Controller {
  const prismaDistributorsRepository = new PrismaDistributorRepository()
  const useCaseCreateDistributor = new CreateDistributor(
    prismaDistributorsRepository,
  )

  const validator = new ValidatorCompositor([])

  return new CreateDistributorController(validator, useCaseCreateDistributor)
}
