import { PrismaEditionsRepository } from '@/application/editions/repositories/prisma/PrismaEditionsRepository'
import { GetEditionController } from '@/application/editions/use-cases/get-edition/get-controller'
import { GetEdition } from '@/application/editions/use-cases/get-edition/get-edition'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeGetEditionController(): Controller {
  const prismaEditionsRepository = new PrismaEditionsRepository()
  const useCaseGetEdition = new GetEdition(prismaEditionsRepository)

  const validator = new ValidatorCompositor([])

  return new GetEditionController(validator, useCaseGetEdition)
}
