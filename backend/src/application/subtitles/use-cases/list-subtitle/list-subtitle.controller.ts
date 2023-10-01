import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListSubtitles } from './list-subtitle'

export class ListSubtitleController implements Controller {
  constructor(private listSubtitles: ListSubtitles) {}

  async handle(): Promise<HttpResponse> {
    const result = await this.listSubtitles.execute()

    return ok({ subtitles: result })
  }
}
