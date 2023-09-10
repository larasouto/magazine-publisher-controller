import { CreateUser } from '@/application/users/use-cases/create-user/create-user'
import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { CreateUserController } from '@/application/users/use-cases/create-user/create-user.controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'
import { CompareFieldsValidator } from '@/infra/validation/CompareFieldsValidator'
import { t } from 'i18next'

export function makeCreateUserController() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const createUser = new CreateUser(prismaUsersRepository)

  const validator = new ValidatorCompositor([
    new CompareFieldsValidator(
      'password',
      'confirmPassword',
      t('errors.passwords_dont_match'),
    ),
  ])

  return new CreateUserController(validator, createUser)
}
