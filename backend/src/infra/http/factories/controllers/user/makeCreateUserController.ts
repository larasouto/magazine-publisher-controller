import { CreateUser } from '@/application/users/use-cases/create-user/create-user'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { CreateUserController } from '@/application/users/use-cases/create-user/create-user.controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'
import { CompareFieldsValidator } from '@/infra/validation/CompareFieldsValidator'
import { t } from 'i18next'
import { Controller } from '@/core/infra/controller'

export function makeCreateUserController(): Controller {
  const prismaUsersRepository = new PrismaUsersRepository()
  const createUser = new CreateUser(prismaUsersRepository)

  const validator = new ValidatorCompositor([
    new CompareFieldsValidator({
      field: 'password',
      fieldToCompare: 'confirmPassword',
      keyMessage: 'account.passwords_dont_match',
    }),
  ])

  return new CreateUserController(validator, createUser)
}
