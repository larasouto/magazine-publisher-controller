import { PrismaCandidatesRepository } from '@/application/candidates/repositories/prisma/PrismaCandidatesRepository'
import { CreateCandidateController } from '@/application/candidates/use-cases/create-candidate/create-candidate.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeCreateCandidatesController(): Controller {
  const prismaCandidatesRepository = new PrismaCandidatesRepository()


  const validator = new ValidatorCompositor([])

  return new CreateCandidateController(validator, useCaseCreateCandidate)
}
