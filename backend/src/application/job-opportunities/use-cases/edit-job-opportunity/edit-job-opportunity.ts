import { Either, left, right } from '@/core/logic/either'
import { IJobOpportunityRepository } from '../../repositories/interfaces/IJobOpportunitiesRepository'
import { JobOpportunityNotFoundError } from './errors/JobOpportunityNotFoundError'


type EditJobOpportunityRequest = {
  office: string
  requirements: string
  hours: string
  wage: string
}

type EditJobOpportunityResponse = Either<JobOpportunityNotFoundError, JobOpportunity>

export class EditJobOpportunity {
  constructor(private jobOpportunitiesRepository: IJobOpportunityRepository) {}

  async execute({
    jobOpportunityId,
    ...request
  }: EditJobOpportunityRequest): Promise<EditJobOpportunityResponse> {
    const jobOpportunityOrError = JobOpportunity.create(
      { ...request, status: request.status as unknown as JobOpportunityStatus },
      jobOpportunityId,
    )

    if (jobOpportunityOrError.isLeft()) {
      return left(jobOpportunityOrError.value)
    }

    const jobOpportunityExists =
      await this.jobOpportunitiesRepository.findById(jobOpportunityId)

    if (!jobOpportunityExists) {
      return left(new JobOpportunityNotFoundError())
    }

    const jobOpportunity = jobOpportunityOrError.value
    await this.jobOpportunitiesRepository.update(jobOpportunity)

    return right(jobOpportunity)
  }
}
