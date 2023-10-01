import { PrismaSubtitlesRepository } from '@/application/subtitles/repositories/prisma/PrismaSubtitlesRepository'
import { ListSubtitles } from '@/application/subtitles/use-cases/list-subtitle/list-subtitle'
import { ListSubtitleController } from '@/application/subtitles/use-cases/list-subtitle/list-subtitle.controller'

import { Controller } from '@/core/infra/controller'

export function makeListSubtitlesController(): Controller {
  const prismaSubtitlesRepository = new PrismaSubtitlesRepository()
  const useCaseListSubtitle = new ListSubtitles(prismaSubtitlesRepository)

  return new ListSubtitleController(useCaseListSubtitle)
}
