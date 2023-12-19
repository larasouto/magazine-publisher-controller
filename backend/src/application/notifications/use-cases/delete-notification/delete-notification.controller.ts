import { Controller } from '@/core/infra/controller'
import { HttpResponse, clientError, ok } from '@/core/infra/http-response'
import { Validator } from '@/core/infra/validator'
import { NotificationNotFoundError } from './errors/NotificationNotFoundError'
import { DeleteNotifications } from './delete-notification'

type DeleteNotificationsControllerRequest = {
  notificationId: string
}

export class DeleteNotificationsontroller implements Controller {
  constructor(
    private readonly validator: Validator<DeleteNotificationsControllerRequest>,
    private deleteNotifications: DeleteNotifications,
  ) {}

  async handle(
    request: DeleteNotificationsControllerRequest,
  ): Promise<HttpResponse> {
    const validated = this.validator.validate(request)

    if (validated.isLeft()) {
      return clientError(validated.value)
    }

    const result = await this.deleteNotifications.execute(request)

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case NotificationNotFoundError:
          return clientError({ type: 'info', message: error.message })
        default:
          return clientError(error)
      }
    }

    return ok({ message: 'Notificação deletada com sucesso' })
  }
}
