import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, created } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { CreateCard } from './create-card'
import { User } from '@/application/users/domain/user'
import { UserNotFoundError } from './errors/UserNotFoundError'

type CreateCardControllerRequest = {
  number: string
  holder: string
  expirationDate: string
  securityCode: number
  billingAddress: string
  phone: string
  type: number
  flag: string
  userId: string
}

export class CreateCardController implements Controller {
  constructor(
    private readonly validator: Validator<CreateCardControllerRequest>,
    private createCard: CreateCard,
  ) {}

  async handle(request: CreateCardControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.createCard.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case UserNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return created({ message: t('card.created') })
  }
}
