import { prismaClient } from '@/infra/prisma/client';
import { IJobOpportunityRepository } from '../interfaces/IJobOpportunitiesRepository';
import { JobOpportunity } from '../../domain/job-opportunity';
import { JobOpportunityMapper } from '../../mappers/job-opportunity.mapper';

export class PrismaJobOpportunitiesRepository
  implements IJobOpportunityRepository
{
  async findById(id: string): Promise<JobOpportunity | null> {
    const jobOpportunity = await prismaClient.jobOpportunity.findUnique({
      where: { id },
    });

    if (!jobOpportunity) {
      return null;
    }

    return JobOpportunityMapper.toDomain(jobOpportunity);
  }

  async create(jobOpportunity: JobOpportunity): Promise<void> {
    const data = await JobOpportunityMapper.toPersistence(jobOpportunity);

    await prismaClient.jobOpportunity.create({
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await prismaClient.jobOpportunity.delete({
      where: { id },
    });
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.jobOpportunity.deleteMany({
      where: { id: { in: ids } },
    });
  }

  async update(jobOpportunity: JobOpportunity): Promise<void> {
    const data = await JobOpportunityMapper.toPersistence(jobOpportunity);

    await prismaClient.jobOpportunity.update({
      where: { id: jobOpportunity.id },
      data,
    });
  }

  async list(): Promise<JobOpportunity[]> {
    const jobOpportunities = await prismaClient.jobOpportunity.findMany();
    return jobOpportunities.map(JobOpportunityMapper.toDomain);
  }
}