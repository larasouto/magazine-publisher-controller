import { PrismaThemesRepository } from '@/application/themes/repositories/prisma/PrismaThemesRepository'
import { ListThemes } from '@/application/themes/use-cases/list-theme/list-theme'
import { ListThemeController } from '@/application/themes/use-cases/list-theme/list-theme.controller'
import { Controller } from '@/core/infra/controller'

export function makeListThemesController(): Controller {
  const prismaThemesRepository = new PrismaThemesRepository()
  const useCaseListTheme = new ListThemes(prismaThemesRepository)

  return new ListThemeController(useCaseListTheme)
}
