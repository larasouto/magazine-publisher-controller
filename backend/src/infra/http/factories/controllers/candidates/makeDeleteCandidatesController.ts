import { PrismaCandidatesRepository } from '@/application/candidates/repositories/prisma/PrismaCandidatesRepository'
import { DeleteCandidate } from '@/application/candidates/use-cases/delete-candidate/delete-candidate'
import { DeleteCandidateController } from '@/application/candidates/use-cases/delete-candidate/delete-candidate.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeDeleteCandidatesController(): Controller {
  const prismaCandidatesRepository = new PrismaCandidatesRepository()
  const useCaseDeleteCandidate = new DeleteCandidate(prismaCandidatesRepository)

  const validator = new ValidatorCompositor([])

  return new DeleteCandidateController(validator, useCaseDeleteCandidate)
}
