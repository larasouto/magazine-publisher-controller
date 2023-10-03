import { PrismaPhotographersRepository } from '@/application/photographers/repositories/prisma/PrismaPhotographersRepository'
import { InactivatePhotographer } from '@/application/photographers/use-cases/inactivate-photographer/inactivate-photographer'
import { InactivatePhotographerController } from '@/application/photographers/use-cases/inactivate-photographer/inactivate-photographer.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeInactivatePhotographersController(): Controller {
  const prismaReportersRepository = new PrismaPhotographersRepository()
  const useCaseInactivatePhotographer = new InactivatePhotographer(
    prismaReportersRepository,
  )

  const validator = new ValidatorCompositor([])

  return new InactivatePhotographerController(
    validator,
    useCaseInactivatePhotographer,
  )
}
