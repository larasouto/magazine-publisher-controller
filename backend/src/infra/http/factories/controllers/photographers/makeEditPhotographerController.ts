import { PrismaPhotographersRepository } from '@/application/photographers/repositories/prisma/PrismaPhotographersRepository'
import { EditPhotographer } from '@/application/photographers/use-cases/edit-photographer/edit-photographer'
import { EditPhotographerController } from '@/application/photographers/use-cases/edit-photographer/edit-photographer.controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeEditPhotographerController() {
  const prismaPhotographersRepository = new PrismaPhotographersRepository()
  const editPhotographer = new EditPhotographer(prismaPhotographersRepository)

  const validator = new ValidatorCompositor([])

  return new EditPhotographerController(validator, editPhotographer)
}
