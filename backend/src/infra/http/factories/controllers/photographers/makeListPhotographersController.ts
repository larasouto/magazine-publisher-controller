import { PrismaPhotographersRepository } from '@/application/photographers/repositories/prisma/PrismaPhotographersRepository'
import { ListPhotographers } from '@/application/photographers/use-cases/list-photographer/list-photographer'
import { ListPhotographersController } from '@/application/photographers/use-cases/list-photographer/list-photographer.controller'

export function makeListPhotographersController() {
  const prismaPhotographersRepository = new PrismaPhotographersRepository()
  const listPhotographers = new ListPhotographers(prismaPhotographersRepository)

  return new ListPhotographersController(listPhotographers)
}
