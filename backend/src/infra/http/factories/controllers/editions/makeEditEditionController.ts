import { PrismaEditionsRepository } from '@/application/editions/repositories/prisma/PrismaEditionsRepository'
import { EditEdition } from '@/application/editions/use-cases/edit-edition/edit-edition'
import { EditEditionController } from '@/application/editions/use-cases/edit-edition/edit-edition.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeEditEditionsController(): Controller {
  const prismaEditionsRepository = new PrismaEditionsRepository()
  const useCaseEditEdition = new EditEdition(prismaEditionsRepository)

  const validator = new ValidatorCompositor([])

  return new EditEditionController(validator, useCaseEditEdition)
}
