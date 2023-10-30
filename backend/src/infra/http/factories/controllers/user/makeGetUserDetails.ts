import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { GetUserDetails } from '@/application/users/use-cases/details/details'
import { GetUserDetailsController } from '@/application/users/use-cases/details/details.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeGetUserDetailsController(): Controller {
  const prismaUsersRepository = new PrismaUsersRepository()
  const useCaseGetUser = new GetUserDetails(prismaUsersRepository)

  const validator = new ValidatorCompositor([])

  return new GetUserDetailsController(validator, useCaseGetUser)
}
