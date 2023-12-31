import { PrismaDistributorRepository } from '@/application/distributor/repositories/Prisma/PrismaDistributorRepository'
import { EditDistributor } from '@/application/distributor/use-case/edit-distributor/edit-distributor'
import { EditDistributorController } from '@/application/distributor/use-case/edit-distributor/edit-distributor.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeEditDistributorController(): Controller {
  const prismaDistributorRepository = new PrismaDistributorRepository()
  const useCaseEditDistributor = new EditDistributor(
    prismaDistributorRepository,
  )

  const validator = new ValidatorCompositor([])

  return new EditDistributorController(validator, useCaseEditDistributor)
}
