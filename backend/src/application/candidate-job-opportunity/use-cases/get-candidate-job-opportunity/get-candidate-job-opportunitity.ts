import { Either, left, right } from '@/core/logic/either'
import { ICandidateJobOpportunityRepository } from '../../repositories/interfaces/ICandidateJobOpportunitiesRepository'
import { CandidateJobOpportunityNotFoundError } from './errors/CandidateJobOpportunityNotFoundError'
import { CandidateJobOpportunity } from '../../domain/candidateJobOpportunity'


type GetCandidateJobOpportunityRequest = {
  candidateJobOpportunityId: string
}

type GetCandidateJobOpportunityResponse = Either<CandidateJobOpportunityNotFoundError, CandidateJobOpportunity>

export class GetCandidateJobOpportunity {
  constructor(private candidateCandidateJobOpportunitiesRepository: ICandidateJobOpportunityRepository) {}

  async execute({
    candidateJobOpportunityId,
  }: GetCandidateJobOpportunityRequest): Promise<GetCandidateJobOpportunityResponse> {
    const candidateJobOpportunity =
      await this.candidateCandidateJobOpportunitiesRepository.findById(candidateJobOpportunityId)

    if (!candidateJobOpportunity) {
      return left(new CandidateJobOpportunityNotFoundError())
    }

    return right(candidateJobOpportunity)
  }
}
