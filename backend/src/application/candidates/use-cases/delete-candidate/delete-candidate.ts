import { Either, left, right } from '@/core/logic/either'
import { ICandidatesRepository } from '../../repositories/interfaces/ICandidatesRepository'
import { CandidateNotFoundError } from './errors/CandidateNotFoundError'
import { OneOrMoreCandidateNotFoundError } from './errors/OneOrMoreCandidateNotFoundError'

type DeleteCandidateRequest = {
  ids: string[]
}

type DeleteCandidateResponse = Either<CandidateNotFoundError, null>

export class DeleteCandidate {
  constructor(private candidatesRepository: ICandidatesRepository) {}

  async execute({
    ids: candidateId,
  }: DeleteCandidateRequest): Promise<DeleteCandidateResponse> {
    const candidateOrCandidates = Array.isArray(candidateId) ? candidateId : [candidateId]

    if (candidateOrCandidates.length === 0) {
      return left(new CandidateNotFoundError())
    }
    const candidatePromises = candidateOrCandidates
      .filter((candidateId) => candidateId)
      .map((candidateId) => this.candidatesRepository.findById(candidateId))

    const candidates = await Promise.all(candidatePromises)

    if (candidates.some((candidate) => candidate === null)) {
      return left(
        candidates.length > 1
          ? new OneOrMoreCandidateNotFoundError()
          : new CandidateNotFoundError(),
      )
    }

    await this.candidatesRepository.deleteMany(candidateOrCandidates)

    return right(null)
  }
}
