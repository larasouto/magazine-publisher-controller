
import { PrismaCandidateJobOpportunitiesRepository } from '@/application/candidate-job-opportunity/repositories/prisma/PrismaCandidateJobOpportunitiesRepository'
import { CreateCandidateJobOpportunity } from '@/application/candidate-job-opportunity/use-cases/create-candidate-job-opportunity/create-candidade-job-opportunity'
import { CreateCandidateJobOpportunityController } from '@/application/candidate-job-opportunity/use-cases/create-candidate-job-opportunity/create-candidade-job-opportunity.controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeCreateCandidateJobOpportunityController() {
  const prismaCandidateJobOpportunitiesRepository = new PrismaCandidateJobOpportunitiesRepository()
  const createCandidateJobOpportunity = new CreateCandidateJobOpportunity(
    prismaCandidateJobOpportunitiesRepository,
  )

  const validator = new ValidatorCompositor([])

  return new CreateCandidateJobOpportunityController(validator, createCandidateJobOpportunity)
}
