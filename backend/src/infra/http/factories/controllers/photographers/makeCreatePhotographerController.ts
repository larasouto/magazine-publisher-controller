import { PrismaPhotographersRepository } from '@/application/photographers/repositories/prisma/PrismaPhotographersRepository'
import { CreatePhotographer } from '@/application/photographers/use-cases/create-photographer/create-photographer'
import { CreatePhotographerController } from '@/application/photographers/use-cases/create-photographer/create-photographer.controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeCreatePhotographerController() {
  const prismaPhotographersRepository = new PrismaPhotographersRepository()
  const createPhotographer = new CreatePhotographer(
    prismaPhotographersRepository,
  )

  const validator = new ValidatorCompositor([])

  return new CreatePhotographerController(validator, createPhotographer)
}
