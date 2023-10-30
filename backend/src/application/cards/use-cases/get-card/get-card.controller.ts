import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { CardNotFoundError } from './errors/CardNotFoundError'
import { GetCard } from './get-card'
import { UserNotFoundError } from './errors/UserNotFoundError'

type GetCardControllerRequest = {
  cardId: string
  userId: string
}

export class GetCardController implements Controller {
  constructor(
    private readonly validator: Validator<GetCardControllerRequest>,
    private getCard: GetCard,
  ) {}

  async handle(request: GetCardControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.getCard.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserNotFoundError:
        case CardNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ dto: result.value.toResponseBody() })
  }
}
