import { CandidateJobOpportunity } from '../../domain/candidateJobOpportunity'
import { ICandidateJobOpportunityRepository } from '../interfaces/ICandidateJobOpportunitiesRepository'


export class InMemoryCandidateJobOpportunitiesRepository implements ICandidateJobOpportunityRepository {
  constructor(public candidateJobOpportunities: CandidateJobOpportunity[] = []) {}

  async findById(id: string): Promise<CandidateJobOpportunity | null> {
    const candidateJobOpportunity = this.candidateJobOpportunities.find((candidateJobOpportunity) => candidateJobOpportunity.id === id)
    return candidateJobOpportunity ?? null
  }

  async create(candidateJobOpportunity: CandidateJobOpportunity): Promise<void> {
    this.candidateJobOpportunities.push(candidateJobOpportunity)
  }

  async deleteMany(ids: string[]): Promise<void> {
    this.candidateJobOpportunities = this.candidateJobOpportunities.filter(
      (candidateJobOpportunity) => !ids.includes(candidateJobOpportunity.id),
    )
  }

  async update(candidateJobOpportunity: CandidateJobOpportunity): Promise<void> {
    const candidateJobOpportunityIndex = this.candidateJobOpportunities.findIndex(
      (candidateJobOpportunity) => candidateJobOpportunity.id === candidateJobOpportunity.id,
    )

    this.candidateJobOpportunities[candidateJobOpportunityIndex] = candidateJobOpportunity
  }

  async list(): Promise<CandidateJobOpportunity[]> {
    return this.candidateJobOpportunities
  }
}
