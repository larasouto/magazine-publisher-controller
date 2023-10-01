import { PrismaMagazinesRepository } from '@/application/magazines/repositories/prisma/PrismaMagazinesRepository'
import { GetMagazine } from '@/application/magazines/use-cases/get-magazine/get-magazine'
import { GetMagazineController } from '@/application/magazines/use-cases/get-magazine/get-magazine.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeGetMagazineController(): Controller {
  const prismaMagazinesRepository = new PrismaMagazinesRepository()
  const useCaseGetMagazine = new GetMagazine(prismaMagazinesRepository)

  const validator = new ValidatorCompositor([])

  return new GetMagazineController(validator, useCaseGetMagazine)
}
