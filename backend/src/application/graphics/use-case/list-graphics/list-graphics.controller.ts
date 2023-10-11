import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListGraphics } from './list-graphics'

export class ListGraphicsController implements Controller {
  constructor(private listGraphicss: ListGraphics) {}

  async handle(): Promise<HttpResponse> {
    const result = await this.listGraphicss.execute()

    return ok({ dto: result })
  }
}
