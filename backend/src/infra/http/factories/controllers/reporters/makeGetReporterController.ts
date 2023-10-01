import { PrismaReportersRepository } from '@/application/reporters/repositories/prisma/PrismaReportersRepository'
import { GetReporter } from '@/application/reporters/use-cases/get-reporter/get-reporter'
import { GetReporterController } from '@/application/reporters/use-cases/get-reporter/get-reporter.controller'
import { Controller } from '@/core/infra/controller'
import { RequiredFieldsValidator } from '@/infra/validation/RequiredFieldsValidator'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

type Validate = {
  reporterId: string
}

export function makeGetReporterController(): Controller {
  const prismaReportersRepository = new PrismaReportersRepository()
  const useCaseGetReporter = new GetReporter(prismaReportersRepository)

  const validator = new ValidatorCompositor<Validate>([
    new RequiredFieldsValidator(),
  ])

  return new GetReporterController(validator, useCaseGetReporter)
}
