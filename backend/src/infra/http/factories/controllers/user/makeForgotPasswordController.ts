import { PrismaUsersRepository } from '@/application/users/repositories/prisma/PrismaUsersRepository'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'
import { Controller } from '@/core/infra/controller'
import { ForgotPassword } from '@/application/users/use-cases/forgot-password/forgot-password'
import { NodeMailerService } from '@/infra/providers/implementations/nodemailer.service'
import { ForgotPasswordController } from '@/application/users/use-cases/forgot-password/forgot-password.controller'

export function makeForgotPasswordController(): Controller {
  const prismaUsersRepository = new PrismaUsersRepository()
  const nodemailerService = new NodeMailerService()
  const forgotPassword = new ForgotPassword(
    prismaUsersRepository,
    nodemailerService,
  )

  const validator = new ValidatorCompositor([])

  return new ForgotPasswordController(validator, forgotPassword)
}
