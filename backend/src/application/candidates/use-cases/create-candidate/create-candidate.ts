import { Either, left, right } from '@/core/logic/either'
import { Candidate } from '../../domain/candidate'
import { ICandidatesRepository } from '../../repositories/interfaces/ICandidatesRepository'
import { CandidateItemsSchema } from '../../domain/candidate.schema'
import { JobOpportunityNotFoundError } from '@/application/job-opportunities/use-cases/get-job-opportunitty/errors/JobOpportunityNotFoundError'


type CreateCandidateRequest = {
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

type CreateCandidateResponse = Either<Error, Candidate>

export class CreateCandidate {
  constructor(
    private candidatesRepository: ICandidatesRepository,
    private jobOpportunitiesRepository: IJobOpportunitiesRepository,
  ) {}

  async execute(request: CreateCandidateRequest): Promise<CreateCandidateResponse> {
    const candidateOrError = Candidate.create(request)
    const candidateItemsOrError = CandidateItemsSchema.safeParse(request)

    if (candidateOrError.isLeft()) {
      return left(candidateOrError.value)
    }

    if (!candidateItemsOrError.success) {
      return left(new Error('Selecionar a vaga de emprego é obrigatório'))
    }

    const jobOpportunityExists = await this.jobOpportunitiesRepository.findById(request.jobOpportunityId)

    if (!jobOpportunityExists) {
      return left(new JobOpportunityNotFoundError())
    }

    const candidate = candidateOrError.value
    await this.candidatesRepository.create(
      candidate,
      request.jobOpportunities,
    )

    return right(candidate)
  }
}
