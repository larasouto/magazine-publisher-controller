import { PrismaJobOpportunitiesRepository } from '@/application/job-opportunities/repositories/prisma/PrismaJobOpportunitiesRepository'
import { EditJobOpportunity } from '@/application/job-opportunities/use-cases/edit-job-opportunity/edit-job-opportunity'
import { EditJobOpportunityController } from '@/application/job-opportunities/use-cases/edit-job-opportunity/edit-job-opportunity.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeEditJobOpportunitiesController(): Controller {
  const prismaJobOpportunitiesRepository = new PrismaJobOpportunitiesRepository()
  const useCaseEditJobOpportunity = new EditJobOpportunity(prismaJobOpportunitiesRepository)

  const validator = new ValidatorCompositor([])

  return new EditJobOpportunityController(validator, useCaseEditJobOpportunity)
}
