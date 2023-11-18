import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { ReviewNotFoundError } from './errors/ReviewNotFoundError'
import { GetReview } from './get-review'
import { ReviewerNotFoundError } from './errors/ReviewerNotFoundError'

type GetReviewControllerRequest = {
  reviewId: string
  userId: string
}

export class GetReviewController implements Controller {
  constructor(
    private readonly validator: Validator<GetReviewControllerRequest>,
    private getReview: GetReview,
  ) {}

  async handle({
    ...request
  }: GetReviewControllerRequest): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.getReview.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ReviewerNotFoundError:
        case ReviewNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ dto: result.value.toResponseBody() })
  }
}
