import { CandidateJobOpportunity } from '../../domain/candidateJobOpportunity'
import { ICandidateJobOpportunityRepository } from '../../repositories/interfaces/ICandidateJobOpportunitiesRepository'

type ListCandidateJobOpportunitiesResponse = (CandidateJobOpportunity | null)[];

export class listCandidateJobOpportunities {
  constructor(private candidateJobOpportunitiesRepository: ICandidateJobOpportunityRepository) {}

  async execute(): Promise<ListCandidateJobOpportunitiesResponse> {
    const candidateJobOpportunities = await this.candidateJobOpportunitiesRepository.list()
    return candidateJobOpportunities
  }
}
