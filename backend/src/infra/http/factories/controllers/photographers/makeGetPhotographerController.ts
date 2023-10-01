import { PrismaPhotographersRepository } from '@/application/photographers/repositories/prisma/PrismaPhotographersRepository'
import { GetPhotographer } from '@/application/photographers/use-cases/get-photographer/get-photographer'
import { GetPhotographerController } from '@/application/photographers/use-cases/get-photographer/get-photographer.controller'
import { Controller } from '@/core/infra/controller'
import { RequiredFieldsValidator } from '@/infra/validation/RequiredFieldsValidator'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

type Validate = {
  photographerId: string
}

export function makeGetPhotographerController(): Controller {
  const prismaPhotographersRepository = new PrismaPhotographersRepository()
  const useCaseGetPhotographer = new GetPhotographer(
    prismaPhotographersRepository,
  )

  const validator = new ValidatorCompositor<Validate>([
    new RequiredFieldsValidator(),
  ])

  return new GetPhotographerController(validator, useCaseGetPhotographer)
}
