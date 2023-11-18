import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { EditReview } from './edit-review'
import { ReviewNotFoundError } from './errors/ReviewNotFoundError'
import { ReviewerNotFoundError } from './errors/ReviewerNotFoundError'
import { EditionNotFoundError } from './errors/EditionNotFoundError'

type EditReviewControllerRequest = {
  reviewId: string
  title: string
  review: string
  rating: number
  editionId: string
  userId: string
}

export class EditReviewController implements Controller {
  constructor(
    private readonly validator: Validator<EditReviewControllerRequest>,
    private editReview: EditReview,
  ) {}

  async handle(request: EditReviewControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.editReview.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ReviewerNotFoundError:
        case EditionNotFoundError:
        case ReviewNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ message: t('review.updated') })
  }
}
