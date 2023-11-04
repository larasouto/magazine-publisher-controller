
import { PrismaBooksotreRepository } from '@/application/bookstore/repositories/prisma/PrismaBookstoresRepository'
import { CreateBookstore } from '@/application/bookstore/use-cases/create-bookstore/create-bookstore'
import { CreateBookstoreController } from '@/application/bookstore/use-cases/create-bookstore/create-bookstore.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeCreateBookstoresController(): Controller {
  const prismaBookstoresRepository = new PrismaBooksotreRepository()
  const useCaseCreateBookstore = new CreateBookstore(prismaBookstoresRepository)

  const validator = new ValidatorCompositor([])

  return new CreateBookstoreController(validator, useCaseCreateBookstore)
}
