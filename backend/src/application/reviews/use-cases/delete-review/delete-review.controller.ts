import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, fail, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { t } from 'i18next'
import { DeleteReview } from './delete-review'
import { ReviewNotFoundError } from './errors/ReviewNotFoundError'
import { OneOrMoreReviewNotFoundError } from './errors/OneOrMoreReviewNotFoundError'

type DeleteReviewControllerRequest = {
  ids: string[]
}

export class DeleteReviewController implements Controller {
  constructor(
    private readonly validator: Validator<DeleteReviewControllerRequest>,
    private deleteReview: DeleteReview,
  ) {}

  async handle(request: DeleteReviewControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.deleteReview.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ReviewNotFoundError:
        case OneOrMoreReviewNotFoundError:
          return clientError(error)
        default:
          return clientError(error)
      }
    }

    const message =
      request.ids?.length > 1 ? t('review.deleted_many') : t('review.deleted')

    return ok({ message })
  }
}
