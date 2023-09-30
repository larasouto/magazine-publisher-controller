import { PrismaThemesRepository } from '@/application/themes/repositories/prisma/PrismaThemesRepository'
import { CreateTheme } from '@/application/themes/use-cases/create-theme/create-theme'
import { CreateThemeController } from '@/application/themes/use-cases/create-theme/create-theme.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeCreateThemesController(): Controller {
  const prismaThemesRepository = new PrismaThemesRepository()
  const useCaseCreateTheme = new CreateTheme(prismaThemesRepository)

  const validator = new ValidatorCompositor([])

  return new CreateThemeController(validator, useCaseCreateTheme)
}
