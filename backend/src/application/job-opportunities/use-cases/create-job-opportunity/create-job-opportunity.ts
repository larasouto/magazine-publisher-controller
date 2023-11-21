import { Either, left, right } from '@/core/logic/either'
import { JobOpportunity } from '@prisma/client'
import { IJobOpportunityRepository } from '../../repositories/interfaces/IJobOpportunitiesRepository'

type CreateJobOpportunityRequest = {
  avatar?: string
  office: string
  requirements: string
  hours: string
  wage: string
}

type CreateJobOpportunityResponse = Either<Error, JobOpportunity>

export class CreateJobOpportunity {
  constructor(private jobOpportunitiesRepository: IJobOpportunityRepository) {}

  async execute(
    request: CreateJobOpportunityRequest,
  ): Promise<CreateJobOpportunityResponse> {
    const jobOpportunityOrError = JobOpportunity.create({
      ...request,
      status: request.status as unknown as JobOpportunityStatus,
    })

    if (jobOpportunityOrError.isLeft()) {
      return left(jobOpportunityOrError.value)
    }

    const user = jobOpportunityOrError.value
    await this.jobOpportunitiesRepository.create(user)

    return right(user)
  }
}
