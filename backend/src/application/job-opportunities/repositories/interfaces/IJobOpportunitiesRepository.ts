import { JobOpportunity } from "../../domain/job-opportunity"

export interface IJobOpportunityRepository {
  findById(id: string): Promise<JobOpportunity | null>
  create(jobOpportunity: JobOpportunity): Promise<void>
  update(jobOpportunity: JobOpportunity): Promise<void>
  delete(id: string): Promise<void>
  deleteMany(ids: string[]): Promise<void>
  list(): Promise<JobOpportunity[]>
}
