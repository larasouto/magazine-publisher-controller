import { PrismaSubtitlesRepository } from '@/application/subtitles/repositories/prisma/PrismaSubtitlesRepository'
import { EditSubtitle } from '@/application/subtitles/use-cases/edit-subtitle/edit-subtitle'
import { EditSubtitleController } from '@/application/subtitles/use-cases/edit-subtitle/edit-subtitle.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeEditSubtitlesController(): Controller {
  const prismaSubtitlesRepository = new PrismaSubtitlesRepository()
  const useCaseEditSubtitle = new EditSubtitle(prismaSubtitlesRepository)

  const validator = new ValidatorCompositor([])

  return new EditSubtitleController(validator, useCaseEditSubtitle)
}
