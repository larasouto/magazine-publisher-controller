import { PrismaBookstoresRepository } from '@/application/bookstore/repositories/prisma/PrismaBookstoresRepository'
import { GetBookstore } from '@/application/bookstore/use-cases/get-bookstore/get-bookstore'
import { GetBookstoreController } from '@/application/bookstore/use-cases/get-bookstore/get-bookstore.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeGetBookstoreController(): Controller {
  const prismaBookstoresRepository = new PrismaBookstoresRepository()
  const useCaseGetBookstore = new GetBookstore(prismaBookstoresRepository)

  const validator = new ValidatorCompositor([])

  return new GetBookstoreController(validator, useCaseGetBookstore)
}
