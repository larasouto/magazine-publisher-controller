import { CandidateJobOpportunity } from "@prisma/client"
import { ICandidateJobOpportunityRepository } from "../../repositories/interfaces/ICandidateJobOpportunitiesRepository"

export type ListCandidateJobOpportunityResponse = (CandidateJobOpportunity | null)[];

export class ListCandidateJobOpportunity {
  constructor(private candidateJobOpportunityRepository: ICandidateJobOpportunityRepository) {}

  async execute(): Promise<ListCandidateJobOpportunityResponse> {
    const candidateJobOpportunities = await this.candidateJobOpportunityRepository.list();
    const filteredCandidateJobOpportunities = candidateJobOpportunities.filter(
      (candidateJobOpportunity) => candidateJobOpportunity !== null,
    ) as ListCandidateJobOpportunityResponse;

    return filteredCandidateJobOpportunities;
  }
}