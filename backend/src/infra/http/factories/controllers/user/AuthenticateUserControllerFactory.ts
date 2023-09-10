import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'
import { CompareFieldsValidator } from '@/infra/validation/CompareFieldsValidator'
import { t } from 'i18next'
import { AuthenticateUser } from '@/application/users/use-cases/authenticate-user/authenticate-user'
import { AuthenticateUserController } from '@/application/users/use-cases/authenticate-user/authenticate-user.controller'

export function makeAuthenticateUserController() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const authenticateUser = new AuthenticateUser(prismaUsersRepository)

  const validator = new ValidatorCompositor([])

  return new AuthenticateUserController(validator, authenticateUser)
}
