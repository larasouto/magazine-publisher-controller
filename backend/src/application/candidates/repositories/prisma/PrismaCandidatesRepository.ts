import { prismaClient } from '@/infra/prisma/client'
import { Candidate } from '../../domain/candidate'
import { CandidateMapper } from '../../mappers/candidate.mapper'
import { ICandidatesRepository } from '../interfaces/ICandidatesRepository'
import { jobOpportunities } from '@/infra/http/routes/job-opportunities.routes'

export class PrismaCandidatesRepository implements ICandidatesRepository {
  async findById(id: string): Promise<Candidate | null> {
    const candidate = await prismaClient.candidate.findUnique({
      where: { id },
      include: {
        candidateJobOpportunity: { include: { job_opportunity: true } },
      },
    })

    if (!candidate) {
      return null
    }

    return CandidateMapper.toDomain(
      candidate,
      candidate.candidateJobOpportunity.map((ra) => ra.job_opportunity_id),
    )
  }

  async create(
    candidate: Candidate,
    job_opportunity: string[],
  ): Promise<void> {
    const data = await CandidateMapper.toPersistence(candidate)

    await prismaClient.candidate.create({
      data: {
        ...data,
        candidateJobOpportunity: {
          create: jobOpportunities.map((JobOpportunity) => ({
            jobOpportunities: { connect: { id: JobOpportunity } },
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
        candidateJobOpportunity: {
          deleteMany: [
            { candidate_id: candidate.id },
            { job_opportunity_id: { notIn: jobOpportunities } },
          ],
          create: jobOpportunities.map((JobOpportunity) => ({
            jobOpportunity: { connect: { id: JobOpportunity } },
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