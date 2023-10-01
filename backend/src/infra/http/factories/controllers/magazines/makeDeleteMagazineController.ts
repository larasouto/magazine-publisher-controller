import { PrismaMagazinesRepository } from '@/application/magazines/repositories/prisma/PrismaMagazinesRepository'
import { DeleteMagazine } from '@/application/magazines/use-cases/delete-magazine/delete-magazine'
import { DeleteMagazineController } from '@/application/magazines/use-cases/delete-magazine/delete-magazine.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeDeleteMagazinesController(): Controller {
  const prismaMagazinesRepository = new PrismaMagazinesRepository()
  const useCaseDeleteMagazine = new DeleteMagazine(prismaMagazinesRepository)

  const validator = new ValidatorCompositor([])

  return new DeleteMagazineController(validator, useCaseDeleteMagazine)
}
