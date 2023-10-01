import { PrismaSubtitlesRepository } from '@/application/subtitles/repositories/prisma/PrismaSubtitlesRepository'
import { DeleteSubtitle } from '@/application/subtitles/use-cases/delete-subtitle/delete-subtitle'
import { DeleteSubtitleController } from '@/application/subtitles/use-cases/delete-subtitle/delete-subtitle.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeDeleteSubtitlesController(): Controller {
  const prismaSubtitlesRepository = new PrismaSubtitlesRepository()
  const useCaseDeleteSubtitle = new DeleteSubtitle(prismaSubtitlesRepository)

  const validator = new ValidatorCompositor([])

  return new DeleteSubtitleController(validator, useCaseDeleteSubtitle)
}
