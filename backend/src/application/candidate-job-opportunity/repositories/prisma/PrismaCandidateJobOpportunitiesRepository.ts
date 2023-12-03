import { prismaClient } from '@/infra/prisma/client'
import { CandidateJobOpportunity } from '../../domain/candidateJobOpportunity'
import { CandidateJobOpportunityMapper } from '../../mappers/candidateJobOpportunity.mapper'
import { ICandidateJobOpportunityRepository } from '../interfaces/ICandidateJobOpportunitiesRepository'

export class PrismaCandidateJobOpportunitiesRepository implements ICandidateJobOpportunityRepository {
  async findById(id: string): Promise<CandidateJobOpportunity | null> {
    const candidateJobOpportunity = await prismaClient.candidateJobOpportunity.findUnique({
      where: { id },
    })

    if (!candidateJobOpportunity) {
      return null
    }

    return CandidateJobOpportunityMapper.toDomain(candidateJobOpportunity)
  }

  async create(candidateJobOpportunity: CandidateJobOpportunity): Promise<void> {
    const data = await CandidateJobOpportunityMapper.toPersistence(candidateJobOpportunity)

    await prismaClient.candidateJobOpportunity.create({
      data,
    })
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.candidateJobOpportunity.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    })
  }

  async update(candidateJobOpportunity: CandidateJobOpportunity): Promise<void> {
    const data = await CandidateJobOpportunityMapper.toPersistence(candidateJobOpportunity)

    await prismaClient.candidateJobOpportunity.update({
      where: { id: candidateJobOpportunity.id },
      data,
    })
  }

  async list(): Promise<CandidateJobOpportunity[]> {
    const candidateJobOpportunities = await prismaClient.candidateJobOpportunity.findMany()
    return candidateJobOpportunities.map(CandidateJobOpportunityMapper.toDomain)
  }
}
