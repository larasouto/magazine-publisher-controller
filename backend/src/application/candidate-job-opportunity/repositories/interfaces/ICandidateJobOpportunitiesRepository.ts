import { CandidateJobOpportunity } from '../../domain/candidateJobOpportunity'

export interface ICandidateJobOpportunityRepository {
  findById(id: string): Promise<CandidateJobOpportunity | null>
  list(): Promise<(CandidateJobOpportunity | null)[]>
  create(candidateJobOpportunity: CandidateJobOpportunity): Promise<void>
  update(candidateJobOpportunity: CandidateJobOpportunity): Promise<void>
  deleteMany(ids: string[]): Promise<void>
}
