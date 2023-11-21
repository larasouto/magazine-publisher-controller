import { PrismaJobOpportunitiesRepository } from '@/application/job-opportunities/repositories/prisma/PrismaJobOpportunitiesRepository'
import { GetJobOpportunity } from '@/application/job-opportunities/use-cases/get-job-opportunitty/get-job-opportunity'
import { GetJobOpportunityController } from '@/application/job-opportunities/use-cases/get-job-opportunitty/get-job-opportunity.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeGetJobOpportunityController(): Controller {
  const prismaJobOpportunitiesRepository = new PrismaJobOpportunitiesRepository()
  const useCaseGetJobOpportunity = new GetJobOpportunity(prismaJobOpportunitiesRepository)

  const validator = new ValidatorCompositor([])

  return new GetJobOpportunityController(validator, useCaseGetJobOpportunity)
}
