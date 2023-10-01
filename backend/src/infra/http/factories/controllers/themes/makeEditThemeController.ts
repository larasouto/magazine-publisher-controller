import { PrismaThemesRepository } from '@/application/themes/repositories/prisma/PrismaThemesRepository'
import { EditTheme } from '@/application/themes/use-cases/edit-theme/edit-theme'
import { EditThemeController } from '@/application/themes/use-cases/edit-theme/edit-theme.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeEditThemesController(): Controller {
  const prismaThemesRepository = new PrismaThemesRepository()
  const useCaseEditTheme = new EditTheme(prismaThemesRepository)

  const validator = new ValidatorCompositor([])

  return new EditThemeController(validator, useCaseEditTheme)
}
