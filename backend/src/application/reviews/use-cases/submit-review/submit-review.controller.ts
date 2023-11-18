import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, created } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { SubmitReview } from './submit-review'
import { ReviewerNotFoundError } from './errors/ReviewerNotFoundError'
import { EditionNotFoundError } from './errors/EditionNotFoundError'

type SubmitReviewControllerRequest = {
  title: string
  review: string
  rating: number
  date: Date
  editionId: string
  userId: string
}

export class SubmitReviewController implements Controller {
  constructor(
    private readonly validator: Validator<SubmitReviewControllerRequest>,
    private submitReview: SubmitReview,
  ) {}

  async handle(request: SubmitReviewControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.submitReview.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ReviewerNotFoundError:
        case EditionNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return created({ message: t('item.created') })
  }
}
