import { PrismaMagazinesRepository } from '@/application/magazines/repositories/prisma/PrismaMagazinesRepository'
import { ListMagazines } from '@/application/magazines/use-cases/list-magazine/list-magazine'
import { ListMagazineController } from '@/application/magazines/use-cases/list-magazine/list-magazine.controller'
import { Controller } from '@/core/infra/controller'

export function makeListMagazinesController(): Controller {
  const prismaMagazinesRepository = new PrismaMagazinesRepository()
  const useCaseListMagazine = new ListMagazines(prismaMagazinesRepository)

  return new ListMagazineController(useCaseListMagazine)
}
