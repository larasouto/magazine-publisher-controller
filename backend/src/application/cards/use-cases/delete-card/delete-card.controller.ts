import { Controller } from '@/core/infra/controller'
import {
  HttpResponse,
  clientError,
  fail,
  notFound,
  ok,
} from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { DeleteCard } from './delete-card'
import { CardNotFoundError } from './errors/CardNotFoundError'
import { OneOrMoreCardNotFoundError } from './errors/OneOrMoreCardNotFoundError'

type DeleteCardControllerRequest = {
  ids: string[]
}

export class DeleteCardController implements Controller {
  constructor(
    private readonly validator: Validator<DeleteCardControllerRequest>,
    private deleteCard: DeleteCard,
  ) {}

  async handle(request: DeleteCardControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.deleteCard.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case CardNotFoundError:
        case OneOrMoreCardNotFoundError:
          return notFound(error)
        default:
          return clientError(error)
      }
    }

    return ok({ message: t('card.deleted') })
  }
}
