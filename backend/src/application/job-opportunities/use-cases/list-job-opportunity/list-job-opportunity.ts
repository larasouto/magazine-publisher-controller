import { IJobOpportunityRepository } from "../../repositories/interfaces/IJobOpportunitiesRepository"

type ListJobOpportunitiesResponse = JobOpportunity[]

export class ListJobOpportunities {
  constructor(private jobOpportunitiesRepository: IJobOpportunityRepository) {}

  async execute(): Promise<ListJobOpportunitiesResponse> {
    const jobOpportunities = await this.jobOpportunitiesRepository.list()
    return jobOpportunities
  }
}
