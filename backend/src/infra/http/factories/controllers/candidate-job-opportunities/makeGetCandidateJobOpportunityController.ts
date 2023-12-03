import { PrismaCandidateJobOpportunitiesRepository } from '@/application/candidate-job-opportunity/repositories/prisma/PrismaCandidateJobOpportunitiesRepository'
import { GetCandidateJobOpportunity } from '@/application/candidate-job-opportunity/use-cases/get-candidate-job-opportunity/get-candidate-job-opportunitity'
import { GetCandidateJobOpportunityController } from '@/application/candidate-job-opportunity/use-cases/get-candidate-job-opportunity/get-candidate-job-opportunitity.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeGetCandidateJobOpportunityController(): Controller {
  const prismaCandidateJobOpportunitiesRepository = new PrismaCandidateJobOpportunitiesRepository()
  const useCaseGetCandidateJobOpportunity = new GetCandidateJobOpportunity(prismaCandidateJobOpportunitiesRepository)

  const validator = new ValidatorCompositor([])

  return new GetCandidateJobOpportunityController(validator, useCaseGetCandidateJobOpportunity)
}
