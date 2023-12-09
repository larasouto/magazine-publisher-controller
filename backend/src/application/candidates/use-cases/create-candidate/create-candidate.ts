import { Either, left, right } from '@/core/logic/either'
import { Candidate } from '../../domain/candidate'
import { ICandidatesRepository } from '../../repositories/interfaces/ICandidatesRepository'

type CreateCandidateRequest = {
  pdfPath: string
  name: string
  age: number
  maritalStatus: string
  nationality: string
  email: string
  phone: number
  address: string
  academicEducation: string
  intendedSalary: number
  desiredJobTitle: string
  companyName: string
  positionHeld: string
  companyContact: string
}

type CreateCandidateResponse = Either<Error, Candidate>

export class CreateCandidate {
  constructor(private candidatesRepository: ICandidatesRepository) {}

  async execute(
    request: CreateCandidateRequest,
  ): Promise<CreateCandidateResponse> {
    const candidateOrError = Candidate.create(request)

    if (candidateOrError.isLeft()) {
      return left(candidateOrError.value)
    }

    const candidate = candidateOrError.value
    await this.candidatesRepository.create(candidate)

    return right(candidate)
  }
}
