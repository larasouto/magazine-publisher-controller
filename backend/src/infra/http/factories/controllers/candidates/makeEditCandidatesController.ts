import { PrismaCandidatesRepository } from '@/application/candidates/repositories/prisma/PrismaCandidatesRepository'
import { EditCandidate } from '@/application/candidates/use-cases/edit-candidate/edit-candidate'
import { EditCandidateController } from '@/application/candidates/use-cases/edit-candidate/edit-candidate.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeEditCandidatesController(): Controller {
  const prismaCandidatesRepository = new PrismaCandidatesRepository()


  const useCaseEditCandidate = new EditCandidate( prismaCandidatesRepository,)

  const validator = new ValidatorCompositor([])

  return new EditCandidateController(validator, useCaseEditCandidate)
}
