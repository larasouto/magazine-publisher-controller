import { Either, left, right } from '@/core/logic/either'
import { ICandidateJobOpportunityRepository } from '../../repositories/interfaces/ICandidateJobOpportunitiesRepository'
import { CandidateJobOpportunity } from '../../domain/candidateJobOpportunity';



type CreateCandidateJobOpportunityRequest = {
  candidateId: string;
  jobOpportunityId: string;
}

type CreateCandidateJobOpportunityResponse = Either<Error, CandidateJobOpportunity>

export class CreateCandidateJobOpportunity {
  constructor(private candidateJobOpportunitiesRepository: ICandidateJobOpportunityRepository) {}

  async execute(
    request: CreateCandidateJobOpportunityRequest,
  ): Promise<CreateCandidateJobOpportunityResponse> {
    const candidateCandidateJobOpportunityOrError = CandidateJobOpportunity.create({
      ...request,
    })

    if (candidateCandidateJobOpportunityOrError.isLeft()) {
      return left(candidateCandidateJobOpportunityOrError.value)
    }

    const job = candidateCandidateJobOpportunityOrError.value
    await this.candidateJobOpportunitiesRepository.create(job)

    return right(job)
  }
}
