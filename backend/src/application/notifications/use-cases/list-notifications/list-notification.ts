import { Notification } from '../../domain/notification'
import { INotificationsRepository } from '../../repositories/interfaces/INotificationsRepository'

type ListNotificationsResponse = Notification[]

export class ListNotifications {
  constructor(private notificationsRepository: INotificationsRepository) {}

  async execute(userId: string): Promise<ListNotificationsResponse> {
    const notifications = await this.notificationsRepository.listByUser(userId)
    return notifications
  }
}
