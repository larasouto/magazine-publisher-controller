import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListCategory } from './list-category'

export class ListCategoriesController implements Controller {
  constructor(private listCategory: ListCategory) {}

  async handle(): Promise<HttpResponse> {
    const result = await this.listCategory.execute()
    return ok({ dto: result })
  }
}
