import { PrismaCandidatesRepository } from '@/application/candidates/repositories/prisma/PrismaCandidatesRepository'
import { GetCandidate } from '@/application/candidates/use-cases/get-candidate/get-candidate'
import { GetCandidateController } from '@/application/candidates/use-cases/get-candidate/get-candidate.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeGetCandidateController(): Controller {
  const prismaCandidatesRepository = new PrismaCandidatesRepository()
  const useCaseGetCandidate = new GetCandidate(prismaCandidatesRepository)

  const validator = new ValidatorCompositor([])

  return new GetCandidateController(validator, useCaseGetCandidate)
}
