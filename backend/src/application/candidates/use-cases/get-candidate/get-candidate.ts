import { Either, left, right } from '@/core/logic/either'
import { Candidate } from '../../domain/candidate'
import { ICandidatesRepository } from '../../repositories/interfaces/ICandidatesRepository'
import { CandidateNotFoundError } from './errors/CandidateNotFoundError'

type GetCandidateRequest = {
  candidateId: string
}

type GetCandidateResponse = Either<CandidateNotFoundError, Candidate>

export class GetCandidate {
  constructor(private candidatesRepository: ICandidatesRepository) {}

  async execute({ candidateId }: GetCandidateRequest): Promise<GetCandidateResponse> {
    const candidate = await this.candidatesRepository.findById(candidateId)

    if (!candidate) {
      return left(new CandidateNotFoundError())
    }

    return right(candidate)
  }
}
