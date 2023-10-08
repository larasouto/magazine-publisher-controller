import { PrismaEditionsRepository } from '@/application/editions/repositories/prisma/PrismaEditionsRepository'
import { CreateEdition } from '@/application/editions/use-cases/create-edition/create-edition'
import { CreateEditionController } from '@/application/editions/use-cases/create-edition/create-edition.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeCreateEditionsController(): Controller {
  const prismaEditionsRepository = new PrismaEditionsRepository()
  const useCaseCreateEdition = new CreateEdition(prismaEditionsRepository)

  const validator = new ValidatorCompositor([])

  return new CreateEditionController(validator, useCaseCreateEdition)
}
