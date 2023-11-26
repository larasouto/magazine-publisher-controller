import { Candidate } from '../../domain/candidate'

export interface ICandidatesRepository {
  findById(id: string): Promise<Candidate | null>
  create(
    candidate: Candidate,
    jobOpportunities: string[],
  ): Promise<void>
  update(
    candidate: Candidate,
    jobOpportunities: string[],
  ): Promise<void>
  deleteMany(ids: string[]): Promise<void>
  list(): Promise<Candidate[]>
}
