import { Either, left, right } from '@/core/logic/either'
import { IJobOpportunityRepository } from '../../repositories/interfaces/IJobOpportunitiesRepository'
import { JobOpportunityNotFoundError } from './errors/JobOpportunityNotFoundError'


type GetJobOpportunityRequest = {
  jobOpportunityId: string
}

type GetJobOpportunityResponse = Either<JobOpportunityNotFoundError, JobOpportunity>

export class GetJobOpportunity {
  constructor(private jobOpportunitiesRepository: IJobOpportunityRepository) {}

  async execute({
    jobOpportunityId,
  }: GetJobOpportunityRequest): Promise<GetJobOpportunityResponse> {
    const jobOpportunity =
      await this.jobOpportunitiesRepository.findById(jobOpportunityId)

    if (!jobOpportunity) {
      return left(new JobOpportunityNotFoundError())
    }

    return right(jobOpportunity)
  }
}
