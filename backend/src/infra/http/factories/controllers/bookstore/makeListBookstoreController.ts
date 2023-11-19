import { PrismaBookstoresRepository } from '@/application/bookstore/repositories/prisma/PrismaBookstoresRepository'
import { Listbookstore } from '@/application/bookstore/use-cases/list-bookstore/list-bookstore'
import { ListBookstoreController } from '@/application/bookstore/use-cases/list-bookstore/list-bookstore.controller'
import { Controller } from '@/core/infra/controller'

export function makeListBookstoresController(): Controller {
  const prismaBookstoresRepository = new PrismaBookstoresRepository()
  const useCaseListBookstore = new Listbookstore(prismaBookstoresRepository)

  return new ListBookstoreController(useCaseListBookstore)
}
