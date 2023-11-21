import { prismaClient } from '@/infra/prisma/client'
import { IJobOpportunityRepository } from '../interfaces/IJobOpportunitiesRepository'
import { JobOpportunity } from '@prisma/client'

export class PrismaJobOpportunitiesRepository
  implements IJobOpportunityRepository
{
  async findById(id: string): Promise<JobOpportunity | null> {
    const jobOpportunity = await prismaClient.jobOpportunity.findUnique({
      where: { id },
    })

    if (!jobOpportunity) {
      return null
    }

    return JobOpportunityMapper.toDomain(jobOpportunity)
  }

  async create(jobOpportunity: JobOpportunity): Promise<void> {
    const data = await JobOpportunityMapper.toPersistence(jobOpportunity)

    await prismaClient.jobOpportunity.create({
      data: {
        ...data,
        status: data.status,
      },
    })
  }

  async delete(id: string): Promise<void> {
    await prismaClient.jobOpportunity.delete({
      where: { id },
    })
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.jobOpportunity.deleteMany({
      where: { id: { in: ids } },
    })
  }

  async update(jobOpportunity: JobOpportunity): Promise<void> {
    const data = await JobOpportunityMapper.toPersistence(jobOpportunity)

    await prismaClient.jobOpportunity.update({
      where: { id: jobOpportunity.id },
      data,
    })
  }

  async list(): Promise<JobOpportunity[]> {
    const jobOpportunities = await prismaClient.jobOpportunity.findMany()
    return jobOpportunities.map(JobOpportunityMapper.toDomain)
  }

  async inactivate(id: string): Promise<void> {
    await prismaClient.jobOpportunity.update({
      where: { id },
      data: { status: 'INACTIVE', departure_date: new Date() },
    })
  }
}
