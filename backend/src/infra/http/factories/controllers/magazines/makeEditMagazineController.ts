import { PrismaMagazinesRepository } from '@/application/magazines/repositories/prisma/PrismaMagazinesRepository'
import { EditMagazine } from '@/application/magazines/use-cases/edit-magazine/edit-magazine'
import { EditMagazineController } from '@/application/magazines/use-cases/edit-magazine/edit-magazine.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeEditMagazinesController(): Controller {
  const prismaMagazinesRepository = new PrismaMagazinesRepository()
  const useCaseEditMagazine = new EditMagazine(prismaMagazinesRepository)

  const validator = new ValidatorCompositor([])

  return new EditMagazineController(validator, useCaseEditMagazine)
}
