import { Either, left, right } from '@/core/logic/either'
import { IJobOpportunityRepository } from '../../repositories/interfaces/IJobOpportunitiesRepository'
import { JobOpportunity } from '../../domain/job-opportunity'

type CreateJobOpportunityRequest = {
  avatar?: string
  office: string
  requirements: string
  hours: number
  wage: number
}

type CreateJobOpportunityResponse = Either<Error, JobOpportunity>

export class CreateJobOpportunity {
  constructor(private jobOpportunitiesRepository: IJobOpportunityRepository) {}

  async execute(
    request: CreateJobOpportunityRequest,
  ): Promise<CreateJobOpportunityResponse> {
    const jobOpportunityOrError = JobOpportunity.create({
      ...request,
    })

    if (jobOpportunityOrError.isLeft()) {
      return left(jobOpportunityOrError.value)
    }

    const job = jobOpportunityOrError.value
    await this.jobOpportunitiesRepository.create(job)

    return right(job)
  }
}
