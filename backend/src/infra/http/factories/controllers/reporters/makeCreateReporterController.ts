import { PrismaReportersRepository } from '@/application/reporters/repositories/prisma/PrismaReportersRepository'
import { CreateReporter } from '@/application/reporters/use-cases/create-reporter/create-reporter'
import { CreateReporterController } from '@/application/reporters/use-cases/create-reporter/create-reporter.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeCreateReportersController(): Controller {
  const prismaReportersRepository = new PrismaReportersRepository()
  const useCaseCreateReporter = new CreateReporter(prismaReportersRepository)

  const validator = new ValidatorCompositor([])

  return new CreateReporterController(validator, useCaseCreateReporter)
}
