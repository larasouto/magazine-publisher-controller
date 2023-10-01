import { PrismaReportersRepository } from '@/application/reporters/repositories/prisma/PrismaReportersRepository'
import { InactivateReporter } from '@/application/reporters/use-cases/inactivate-reporter/inactivate-reporter'
import { InactivateReporterController } from '@/application/reporters/use-cases/inactivate-reporter/inactivate-reporter.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeInactivateReportersController(): Controller {
  const prismaReportersRepository = new PrismaReportersRepository()
  const useCaseInactivateReporter = new InactivateReporter(
    prismaReportersRepository,
  )

  const validator = new ValidatorCompositor([])

  return new InactivateReporterController(validator, useCaseInactivateReporter)
}
