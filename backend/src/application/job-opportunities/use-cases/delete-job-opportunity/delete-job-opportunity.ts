import { Either, left, right } from '@/core/logic/either'
import { IJobOpportunityRepository } from '../../repositories/interfaces/IJobOpportunitiesRepository'
import { JobOpportunityNotFoundError } from './errors/JobOpportunityNotFoundError'


type DeleteJobOpportunityRequest = {
  magazineId: string
}

type DeleteMagazineResponse = Either<JobOpportunityNotFoundError, null>

export class DeleteMagazine {
  jobOpportunitiesRepository: any
  constructor(private magazinesRepository: IJobOpportunityRepository) {}

  async execute({
    magazineId,
  }: DeleteJobOpportunityRequest): Promise<DeleteMagazineResponse> {
    const jobOpportunityExists = await this.jobOpportunitiesRepository.findById(jobOpportunityId)

    if (!jobOpportunityExists) {
      return left(new JobOpportunityNotFoundError())
    }

    await this.jobOpportunitiesRepository.delete(jobOpportunityId)

    return right(null)
  }
}
