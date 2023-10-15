import { PrismaDistributorRepository } from '@/application/distributor/repositories/Prisma/PrismaDistributorRepository'
import { CreateDistributorController } from '@/application/distributor/use-case/create-distributor/create-distributor.controller'
import { CreateDistributor } from '@/application/distributor/use-case/create-distributor/create-dsitributor'
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
