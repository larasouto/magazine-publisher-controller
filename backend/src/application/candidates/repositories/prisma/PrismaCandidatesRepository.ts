import { prismaClient } from '@/infra/prisma/client'
import { Candidate } from '../../domain/candidate'
import { ICandidatesRepository } from '../interfaces/ICandidatesRepository'
import { CandidateMapper } from '../../mappers/candidate.mapper'

export class PrismaCandidatesRepository implements ICandidatesRepository {
  async findById(id: string): Promise<Candidate | null> {
    const candidate = await prismaClient.candidate.findUnique({
      where: { id },
    })

    if (!candidate) {
      return null
    }

    return CandidateMapper.toDomain(candidate)
  }

  async create(candidate: Candidate): Promise<void> {
    const data = await CandidateMapper.toPersistence(candidate)

    await prismaClient.candidate.create({
      data,
    })
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.candidate.deleteMany({
      where: { id: { in: ids } },
    })
  }

  async update(candidate: Candidate): Promise<void> {
    const data = await CandidateMapper.toPersistence(candidate)

    await prismaClient.candidate.update({
      where: { id: candidate.id },
      data,
    })
  }

  async list(): Promise<Candidate[]> {
    const candidates = await prismaClient.candidate.findMany()
    return candidates.map(CandidateMapper.toDomain)
  }
}
