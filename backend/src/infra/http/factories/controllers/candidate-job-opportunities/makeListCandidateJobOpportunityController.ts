import { PrismaCandidateJobOpportunitiesRepository } from '@/application/candidate-job-opportunity/repositories/prisma/PrismaCandidateJobOpportunitiesRepository'
import { ListCandidateJobOpportunity } from '@/application/candidate-job-opportunity/use-cases/list-candidate-job-opportunity/list-candidate-job-opportunity'
import { ListCandidateJobOpportunitiesController } from '@/application/candidate-job-opportunity/use-cases/list-candidate-job-opportunity/list-candidate-job-opportunity.controller'
import { Controller } from '@/core/infra/controller'


export function makeListCandidateJobOpportunitiesController(): Controller {
  const prismaCandidateJobOpportunitiesRepository = new PrismaCandidateJobOpportunitiesRepository()
  const useCaseListCandidateJobOpportunity = new ListCandidateJobOpportunity(prismaCandidateJobOpportunitiesRepository)

  return new ListCandidateJobOpportunitiesController(useCaseListCandidateJobOpportunity)
}
