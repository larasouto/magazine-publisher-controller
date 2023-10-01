import { PrismaReportersRepository } from '@/application/reporters/repositories/prisma/PrismaReportersRepository'
import { ListReporters } from '@/application/reporters/use-cases/list-reporter/list-reporter'
import { ListReportersController } from '@/application/reporters/use-cases/list-reporter/list-reporter.controller'
import { Controller } from '@/core/infra/controller'

export function makeListReportersController(): Controller {
  const prismaReportersRepository = new PrismaReportersRepository()
  const useCaseListReporter = new ListReporters(prismaReportersRepository)

  return new ListReportersController(useCaseListReporter)
}
