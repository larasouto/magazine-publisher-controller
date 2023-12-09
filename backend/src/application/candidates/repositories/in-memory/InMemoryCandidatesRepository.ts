import { Candidate } from '../../domain/candidate'
import { ICandidatesRepository } from '../interfaces/ICandidatesRepository'

export class InMemoryCandidatesRepository implements ICandidatesRepository {
  constructor(public candidates: Candidate[] = []) {}

  async findById(id: string): Promise<Candidate | null> {
    const candidate = this.candidates.find((candidate) => candidate.id === id)

    if (!candidate) {
      return null
    }

    return candidate
  }

  async create(candidate: Candidate): Promise<void> {
    this.candidates.push(candidate)
  }

  async deleteMany(ids: string[]): Promise<void> {
    ids.forEach((id) => {
      const candidateIndex = this.candidates.findIndex((candidate) => candidate.id === id)

      this.candidates.splice(candidateIndex, 1)
    })
  }

  async update(candidate: Candidate): Promise<void> {
    const candidateIndex = this.candidates.findIndex((candidate) => candidate.id === candidate.id)

    this.candidates[candidateIndex] = candidate
  }

  async list(): Promise<Candidate[]> {
    return this.candidates
  }
}
