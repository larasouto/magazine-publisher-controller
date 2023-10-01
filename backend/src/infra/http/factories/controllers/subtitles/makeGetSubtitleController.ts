import { PrismaSubtitlesRepository } from '@/application/subtitles/repositories/prisma/PrismaSubtitlesRepository'
import { GetSubtitle } from '@/application/subtitles/use-cases/get-subtitle/get-subtitle'
import { GetSubtitleController } from '@/application/subtitles/use-cases/get-subtitle/get-subtitle.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeGetSubtitleController(): Controller {
  const prismaSubtitlesRepository = new PrismaSubtitlesRepository()
  const useCaseGetSubtitle = new GetSubtitle(prismaSubtitlesRepository)

  const validator = new ValidatorCompositor([])

  return new GetSubtitleController(validator, useCaseGetSubtitle)
}
