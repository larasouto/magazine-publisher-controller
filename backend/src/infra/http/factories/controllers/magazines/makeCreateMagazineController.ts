import { PrismaMagazinesRepository } from '@/application/magazines/repositories/prisma/PrismaMagazinesRepository'
import { CreateMagazine } from '@/application/magazines/use-cases/create-magazine/create-magazine'
import { CreateMagazineController } from '@/application/magazines/use-cases/create-magazine/create-magazine.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeCreateMagazinesController(): Controller {
  const prismaMagazinesRepository = new PrismaMagazinesRepository()
  const useCaseCreateMagazine = new CreateMagazine(prismaMagazinesRepository)

  const validator = new ValidatorCompositor([])

  return new CreateMagazineController(validator, useCaseCreateMagazine)
}
