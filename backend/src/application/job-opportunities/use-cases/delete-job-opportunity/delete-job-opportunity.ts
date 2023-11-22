import { Either, left, right } from '@/core/logic/either'
import { IJobOpportunityRepository } from '../../repositories/interfaces/IJobOpportunitiesRepository'
import { JobOpportunityNotFoundError } from './errors/JobOpportunityNotFoundError'


type DeleteJobOpportunityRequest = {
  jobOpportunityId: string
}

type DeleteJobOpportunityResponse = Either<JobOpportunityNotFoundError, null>

export class DeleteJobOpportunity {
  constructor(private jobOpportunitiesRepository: IJobOpportunityRepository) {}

  async execute({
    jobOpportunityId,
  }: DeleteJobOpportunityRequest): Promise<DeleteJobOpportunityResponse> {
    const jobOpportunityExists = await this.jobOpportunitiesRepository.findById(jobOpportunityId)

    if (!jobOpportunityExists) {
      return left(new JobOpportunityNotFoundError())
    }

    await this.jobOpportunitiesRepository.delete(jobOpportunityId)

    return right(null)
  }
}
