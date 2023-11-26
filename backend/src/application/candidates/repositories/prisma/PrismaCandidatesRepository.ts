import { prismaClient } from '@/infra/prisma/client'
import { Candidate } from '../../domain/candidate'
import { CandidateMapper } from '../../mappers/candidate.mapper'
import { ICandidatesRepository } from '../interfaces/ICandidatesRepository'

export class PrismaCandidatesRepository implements ICandidatesRepository {
  async findById(id: string): Promise<Candidate | null> {
    const candidate = await prismaClient.candidate.findUnique({
      where: { id },
      include: {
        jobOpportunities_candidates: { include: { jobOpportunities: true } },
      },
    })

    if (!candidate) {
      return null
    }

    return CandidateMapper.toDomain(
      candidate,
      candidate.jobOpportunities_candidates.map((ra) => ra.jobOpportunities.id),
    )
  }

  async create(
    candidate: Candidate,
    jobOpportunities: string[],
  ): Promise<void> {
    const data = await CandidateMapper.toPersistence(candidate)

    await prismaClient.candidate.create({
      data: {
        ...data,
        jobOpportunity_candidates: {
          create: jobOpportunities.map((jobOpportunity) => ({
            jobOpportunity: { connect: { id: jobOpportunity } },
          })),
        },
      },
    })
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.candidate.deleteMany({
      where: { id: { in: ids } },
    })
  }

  async update(
    candidate: Candidate,
    jobOpportunities: string[],
  ): Promise<void> {
    const data = await CandidateMapper.toPersistence(candidate)

    await prismaClient.candidate.update({
      where: { id: candidate.id },
      data: {
        ...data,
        jobOpportunity_candidates: {
          deleteMany: [
            { candidate_id: candidate.id },
            { jobOpportunity_id: { notIn: jobOpportunities } },
          ],
          create: jobOpportunities.map((jobOpportunity) => ({
            jobOpportunity: { connect: { id: jobOpportunity } },
          })),
        },
      },
    })
  }

  async list(): Promise<Candidate[]> {
    const candidates = await prismaClient.candidate.findMany()
    return candidates.map((candidate) => CandidateMapper.toDomain(candidate))
  }
}
