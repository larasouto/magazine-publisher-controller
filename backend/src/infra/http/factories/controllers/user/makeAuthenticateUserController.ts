import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { AuthenticateUser } from '@/application/users/use-cases/authenticate-user/authenticate-user'
import { AuthenticateUserController } from '@/application/users/use-cases/authenticate-user/authenticate-user.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeAuthenticateUserController(): Controller {
  const prismaUsersRepository = new PrismaUsersRepository()
  const authenticateUser = new AuthenticateUser(prismaUsersRepository)

  const validator = new ValidatorCompositor([])

  return new AuthenticateUserController(validator, authenticateUser)
}
