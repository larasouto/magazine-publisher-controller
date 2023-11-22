
import { PrismaJobOpportunitiesRepository } from '@/application/job-opportunities/repositories/prisma/PrismaJobOpportunitiesRepository'
import { DeleteJobOpportunity } from '@/application/job-opportunities/use-cases/delete-job-opportunity/delete-job-opportunity'
import { DeleteJobOpportunityController } from '@/application/job-opportunities/use-cases/delete-job-opportunity/delete-job-opportunity.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeDeleteJobOpportunitiesController(): Controller {
  const prismaJobOpportunitiesRepository = new PrismaJobOpportunitiesRepository()
  const useCaseDeleteJobOpportunity = new DeleteJobOpportunity(prismaJobOpportunitiesRepository)

  const validator = new ValidatorCompositor([])

  return new DeleteJobOpportunityController(validator, useCaseDeleteJobOpportunity)
}
