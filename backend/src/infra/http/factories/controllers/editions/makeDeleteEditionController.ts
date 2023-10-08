import { PrismaEditionsRepository } from '@/application/editions/repositories/prisma/PrismaEditionsRepository'
import { DeleteEdition } from '@/application/editions/use-cases/delete-edition/delete-edition'
import { DeleteEditionController } from '@/application/editions/use-cases/delete-edition/delete-edition.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeDeleteEditionsController(): Controller {
  const prismaEditionsRepository = new PrismaEditionsRepository()
  const useCaseDeleteEdition = new DeleteEdition(prismaEditionsRepository)

  const validator = new ValidatorCompositor([])

  return new DeleteEditionController(validator, useCaseDeleteEdition)
}
