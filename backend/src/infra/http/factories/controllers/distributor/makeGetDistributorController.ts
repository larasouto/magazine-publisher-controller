import { PrismaDistributorRepository } from '@/application/distributor/repositories/Prisma/PrismaDistributorRepository'
import { GetDistributor } from '@/application/distributor/use-case/get-distributor/get-distributor'
import { GetDistributorController } from '@/application/distributor/use-case/get-distributor/get-distributor.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeGetDistributorController(): Controller {
  const prismaDistributorRepository = new PrismaDistributorRepository()
  const useCaseGetDistributor = new GetDistributor(prismaDistributorRepository)

  const validator = new ValidatorCompositor([])

  return new GetDistributorController(validator, useCaseGetDistributor)
}
