import { PrismaCandidatesRepository } from '@/application/candidates/repositories/prisma/PrismaCandidatesRepository'
import { ListCandidates } from '@/application/candidates/use-cases/list-candidate/list-candidate'
import { ListCandidateController } from '@/application/candidates/use-cases/list-candidate/list-candidate.controller'
import { Controller } from '@/core/infra/controller'

export function makeListCandidatesController(): Controller {
  const prismaCandidatesRepository = new PrismaCandidatesRepository()
  const useCaseListCandidate = new ListCandidates(prismaCandidatesRepository)

  return new ListCandidateController(useCaseListCandidate)
}
