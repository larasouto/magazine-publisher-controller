import { Either, left, right } from '@/core/logic/either'
import { IJobOpportunityRepository } from '../../repositories/interfaces/IJobOpportunitiesRepository'
import { JobOpportunityNotFoundError } from './errors/JobOpportunityNotFoundError'


type EditJobOpportunityRequest = {
  office: string
  requirements: string
  hours: string
  wage: string
  name: string
  age: string
  marital_status: string
  nationality: string
  email: string
  phone: string
  address: string
  academic_education: string
  intended_salary: string
  desired_job_title: string
  company_name: string
  position_held: string
  company_contact: string
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
