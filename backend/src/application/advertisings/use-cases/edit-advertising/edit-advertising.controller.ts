import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { EditAdvertising } from './edit-advertising'
import { AdvertisingNotFoundError } from './errors/AdvertisingNotFoundError'

type EditAdvertisingControllerRequest = {
  advertisingId: string
  imagePath: string
  title: string
  category: number
  type: number
  price: number
  paid: boolean
  magazineId: string
  userId: string
}

export class EditAdvertisingController implements Controller {
  constructor(
    private readonly validator: Validator<EditAdvertisingControllerRequest>,
    private editAdvertising: EditAdvertising,
  ) {}

  async handle(
    request: EditAdvertisingControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.editAdvertising.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case AdvertisingNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ message: t('advertising.updated') })
  }
}
