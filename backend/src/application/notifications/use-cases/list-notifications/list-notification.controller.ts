import { Controller } from '@/core/infra/controller'
import { HttpResponse, ok } from '@/core/infra/http-response'
import { ListNotifications } from './list-notification'

type ListNotificationsControllerRequest = {
  userId: string
}

export class ListNotificationController implements Controller {
  constructor(private listNotifications: ListNotifications) {}

  async handle({
    userId,
  }: ListNotificationsControllerRequest): Promise<HttpResponse> {
    const result = await this.listNotifications.execute(userId)

    return ok({
      dto: result.map((notification) => notification.toResponseBody()),
    })
  }
}
