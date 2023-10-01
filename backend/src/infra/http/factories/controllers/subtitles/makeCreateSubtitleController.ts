import { PrismaSubtitlesRepository } from '@/application/subtitles/repositories/prisma/PrismaSubtitlesRepository'
import { CreateSubtitle } from '@/application/subtitles/use-cases/create-subtitle/create-subtitle'
import { CreateSubtitleController } from '@/application/subtitles/use-cases/create-subtitle/create-subtitle.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeCreateSubtitlesController(): Controller {
  const prismaSubtitlesRepository = new PrismaSubtitlesRepository()
  const useCaseCreateSubtitle = new CreateSubtitle(prismaSubtitlesRepository)

  const validator = new ValidatorCompositor([])

  return new CreateSubtitleController(validator, useCaseCreateSubtitle)
}
