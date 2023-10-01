import { PrismaThemesRepository } from '@/application/themes/repositories/prisma/PrismaThemesRepository'
import { GetTheme } from '@/application/themes/use-cases/get-theme/get-theme'
import { GetThemeController } from '@/application/themes/use-cases/get-theme/get-theme.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeGetThemeController(): Controller {
  const prismaThemesRepository = new PrismaThemesRepository()
  const useCaseGetTheme = new GetTheme(prismaThemesRepository)

  const validator = new ValidatorCompositor([])

  return new GetThemeController(validator, useCaseGetTheme)
}
