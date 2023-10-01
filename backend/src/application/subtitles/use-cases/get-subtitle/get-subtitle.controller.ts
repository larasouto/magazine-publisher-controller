import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { SubtitleNotFoundError } from './errors/SubtitleNotFoundError'
import { GetSubtitle } from './get-subtitle'

type GetSubtitleControllerRequest = {
  subtitleId: string
}

export class GetSubtitleController implements Controller {
  constructor(
    private readonly validator: Validator<GetSubtitleControllerRequest>,
    private getSubtitle: GetSubtitle,
  ) {}

  async handle(request: GetSubtitleControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.getSubtitle.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case SubtitleNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ dto: result.value })
  }
}
