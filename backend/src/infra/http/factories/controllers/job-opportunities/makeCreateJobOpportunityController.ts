
import { PrismaJobOpportunitiesRepository } from '@/application/job-opportunity/repositories/prisma/PrismaJobOpportunitiesRepository'
import { CreateJobOpportunity } from '@/application/job-opportunity/use-cases/create-job-opportunity/create-job-opportunity'
import { CreateJobOpportunityController } from '@/application/job-opportunity/use-cases/create-job-opportunity/create-job-opportunity.controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeCreateJobOpportunityController() {
  const prismaJobOpportunitiesRepository = new PrismaJobOpportunitiesRepository()
  const createJobOpportunity = new CreateJobOpportunity(
    prismaJobOpportunitiesRepository,
  )

  const validator = new ValidatorCompositor([])

  return new CreateJobOpportunityController(validator, createJobOpportunity)
}
