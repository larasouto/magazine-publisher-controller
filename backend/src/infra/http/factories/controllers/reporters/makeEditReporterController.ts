import { PrismaReportersRepository } from '@/application/reporters/repositories/prisma/PrismaReportersRepository'
import { EditReporter } from '@/application/reporters/use-cases/edit-reporter/edit-reporter'
import { EditReporterController } from '@/application/reporters/use-cases/edit-reporter/edit-reporter.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeEditReportersController(): Controller {
  const prismaReportersRepository = new PrismaReportersRepository()
  const useCaseEditReporter = new EditReporter(prismaReportersRepository)

  const validator = new ValidatorCompositor([])

  return new EditReporterController(validator, useCaseEditReporter)
}
