import { PrismaDistributorRepository } from '@/application/distributors/repositories/prisma/PrismaDistributorRepository'
import { GetDistributor } from '@/application/distributors/use-case/get-distributor/get-distributor'
import { GetDistributorController } from '@/application/distributors/use-case/get-distributor/get-distributor.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeGetDistributorController(): Controller {
  const prismaDistributorRepository = new PrismaDistributorRepository()
  const useCaseGetDistributor = new GetDistributor(prismaDistributorRepository)

  const validator = new ValidatorCompositor([])

  return new GetDistributorController(validator, useCaseGetDistributor)
}
