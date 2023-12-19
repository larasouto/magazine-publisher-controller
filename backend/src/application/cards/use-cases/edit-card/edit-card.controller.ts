import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { EditCard } from './edit-card'
import { CardNotFoundError } from './errors/CardNotFoundError'

type EditCardControllerRequest = {
  cardId: string
  number: string
  holder: string
  expirationDate: string
  securityCode: string
  billingAddress: string
  phone: string
  type: number
  flag: string
  userId: string
}

export class EditCardController implements Controller {
  constructor(
    private readonly validator: Validator<EditCardControllerRequest>,
    private editCard: EditCard,
  ) {}

  async handle(request: EditCardControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.editCard.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case CardNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ message: 'Cartão atualizado com sucesso' })
  }
}
