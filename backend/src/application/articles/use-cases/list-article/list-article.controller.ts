import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListArticles } from './list-article'

export class ListArticleController implements Controller {
  constructor(private listArticles: ListArticles) {}

  async handle(): Promise<HttpResponse> {
    const result = await this.listArticles.execute()

    return ok({ dto: result.map((article) => article?.toResponseBody()) })
  }
}
