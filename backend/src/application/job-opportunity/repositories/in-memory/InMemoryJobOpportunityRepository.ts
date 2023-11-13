export class InMemoryJobOpportunitiesRepository
  implements IJobOpportunityRepository
{
  constructor(public jobOpportunity: JobOpportunity[] = []) {}

  async findById(id: string): Promise<JobOpportunity | null> {
    const jobOpportunity = this.jobOpportunities.find(
      (jobOpportunity) => jobOpportunity.id === id,
    )

    if (!jobOpportunity) {
      return null
    }

    return jobOpportunity
  }

  async create(jobOpportunity: JobOpportunity): Promise<void> {
    this.jobOpportunities.push(jobOpportunity)
  }

  async delete(id: string): Promise<void> {
    const jobOpportunityIndex = this.jobOpportunities.findIndex(
      (jobOpportunity) => jobOpportunity.id === id,
    )

    this.jobOpportunities.splice(jobOpportunityIndex, 1)
  }

  async deleteMany(ids: string[]): Promise<void> {
    ids.forEach((id) => {
      const jobOpportunityIndex = this.jobOpportunities.findIndex(
        (jobOpportunity) => jobOpportunity.id === id,
      )

      this.jobOpportunities.splice(jobOpportunityIndex, 1)
    })
  }

  async update(jobOpportunity: JobOpportunity): Promise<void> {
    const jobOpportunityIndex = this.jobOpportunities.findIndex(
      (jobOpportunity) => jobOpportunity.id === jobOpportunity.id,
    )

    this.jobOpportunities[jobOpportunityIndex] = jobOpportunity
  }

  async list(): Promise<jobOpportunity[]> {
    return this.jobOpportunities
  }

  async inactivate(id: string): Promise<void> {
    const jobOpportunityIndex = this.jobOpportunities.findIndex(
      (jobOpportunity) => jobOpportunity.id === id,
    )

    const jobOpportunity = {
      ...this.jobOpportunities[jobOpportunityIndex],
      status: JobOpportunityStatus.INACTIVE,
    }

    this.jobOpportunities[jobOpportunityIndex] = JobOpportunity.create({
      ...jobOpportunity.props,
    }).value as JobOpportunity
  }
}
