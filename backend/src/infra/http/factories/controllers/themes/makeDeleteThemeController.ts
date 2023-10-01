import { PrismaThemesRepository } from '@/application/themes/repositories/prisma/PrismaThemesRepository'
import { DeleteTheme } from '@/application/themes/use-cases/delete-theme/delete-theme'
import { DeleteThemeController } from '@/application/themes/use-cases/delete-theme/delete-theme.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeDeleteThemesController(): Controller {
  const prismaThemesRepository = new PrismaThemesRepository()
  const useCaseDeleteTheme = new DeleteTheme(prismaThemesRepository)

  const validator = new ValidatorCompositor([])

  return new DeleteThemeController(validator, useCaseDeleteTheme)
}
