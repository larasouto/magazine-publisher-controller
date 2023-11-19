import { PrismaBookstoresRepository } from '@/application/bookstore/repositories/prisma/PrismaBookstoresRepository'
import { EditBookstore } from '@/application/bookstore/use-cases/edit-bookstore/edit-bookstore'
import { EditbookstoreController } from '@/application/bookstore/use-cases/edit-bookstore/edit-bookstore.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeEditBookstoresController(): Controller {
  const prismaBookstoresRepository = new PrismaBookstoresRepository()
  const useCaseEditBookstore = new EditBookstore(prismaBookstoresRepository)

  const validator = new ValidatorCompositor([])

  return new EditbookstoreController(validator, useCaseEditBookstore)
}
