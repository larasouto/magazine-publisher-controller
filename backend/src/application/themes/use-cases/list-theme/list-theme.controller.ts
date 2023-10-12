import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListThemes } from './list-theme'

export class ListThemeController implements Controller {
  constructor(private listThemes: ListThemes) {}

  async handle(): Promise<HttpResponse> {
    const result = await this.listThemes.execute()

    return ok({ dto: result.map((theme) => theme?.toResponseBody()) })
  }
}
