import { Either, left, right } from '@/core/logic/either'
import { Candidate } from '../../domain/candidate'
import { ICandidatesRepository } from '../../repositories/interfaces/ICandidatesRepository'
import { CandidateNotFoundError } from './errors/CandidateNotFoundError'
import { IJobOpportunityRepository } from '@/application/job-opportunities/repositories/interfaces/IJobOpportunitiesRepository'
import { JobOpportunityNotFoundError } from './errors/JobOpportunityNotFoundError'



type EditCandidateRequest = {
  candidateId: string
  pdfPath: string
  name: string
  age: number
  maritalStatus: string
  nationality: string
  email: string
  phone: string
  address: string
  academicEducation: string
  intendedSalary: number
  desiredJobTitle: string
  jobOpportunities: string[]
  companyName: string
  positionHeld: string
  companyContact: string
}

type EditCandidateResponse = Either<CandidateNotFoundError, Candidate>

export class EditCandidate {
  constructor(
    private candidatesRepository: ICandidatesRepository,
    private jobOpportunitiesRepository: IJobOpportunityRepository,
  ) {}

  async execute({
    candidateId,
    ...request
  }: EditCandidateRequest): Promise<EditCandidateResponse> {
    const candidateOrError = Candidate.create(request, candidateId)

    if (candidateOrError.isLeft()) {
      return left(candidateOrError.value)
    }

    const jobOpportunityExists = await this.jobOpportunitiesRepository.findById(request.jobOpportunityId)

    if (!jobOpportunityExists) {
      return left(new JobOpportunityNotFoundError())
    }

    const candidateExists = await this.candidatesRepository.findById(candidateId)

    if (!candidateExists) {
      return left(new CandidateNotFoundError())
    }

    const candidate = candidateOrError.value
    await this.candidatesRepository.update(
      candidate,
      request.jobOpportunities,
    )

    return right(candidate)
  }
}
