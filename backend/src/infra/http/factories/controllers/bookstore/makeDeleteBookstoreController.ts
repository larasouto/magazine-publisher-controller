
import { PrismaBookstoresRepository } from '@/application/bookstore/repositories/prisma/PrismaBookstoresRepository'
import { DeleteBookstore } from '@/application/bookstore/use-cases/delete-bookstore/delete-bookstore'
import { DeleteBookstoreController } from '@/application/bookstore/use-cases/delete-bookstore/delete-bookstore.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeDeleteBookstoresController(): Controller {
  const prismaBookstoresRepository = new PrismaBookstoresRepository()
  const useCaseDeleteBookstore = new DeleteBookstore(prismaBookstoresRepository)

  const validator = new ValidatorCompositor([])

  return new DeleteBookstoreController(validator, useCaseDeleteBookstore)
}
