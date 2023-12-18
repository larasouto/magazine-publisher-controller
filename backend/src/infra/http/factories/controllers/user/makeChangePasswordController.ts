import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'
import { Controller } from '@/core/infra/controller'
import { CompareFieldsValidator } from '@/infra/validation/CompareFieldsValidator'
import { ChangePassword } from '@/application/users/use-cases/change-password/change-password'
import { ChangePasswordController } from '@/application/users/use-cases/change-password/change-password.controller'

type ComparableFields = {
  password: string
  confirmPassword: string
}

export function makeChangePasswordController(): Controller {
  const prismaUsersRepository = new PrismaUsersRepository()
  const resetPassword = new ChangePassword(prismaUsersRepository)

  const validator = new ValidatorCompositor<ComparableFields>([
    new CompareFieldsValidator({
      field: 'password',
      fieldToCompare: 'confirmPassword',
      keyMessage: 'account.passwords_dont_match',
    }),
  ])

  return new ChangePasswordController(validator, resetPassword)
}
