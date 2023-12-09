import { Candidate } from '../../domain/candidate'
import { ICandidatesRepository } from '../../repositories/interfaces/ICandidatesRepository'

type ListCandidatesResponse = Candidate[]

export class ListCandidates {
  constructor(private candidatesRepository: ICandidatesRepository) {}

  async execute(): Promise<ListCandidatesResponse> {
    const candidates = await this.candidatesRepository.list()
    return candidates
  }
}
