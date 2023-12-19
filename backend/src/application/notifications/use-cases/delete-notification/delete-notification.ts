import { Either, left, right } from '@/core/logic/either'
import { INotificationsRepository } from '../../repositories/interfaces/INotificationsRepository'
import { NotificationNotFoundError } from './errors/NotificationNotFoundError'

type DeleteNotificationsRequest = {
  notificationId: string
}

type DeleteNotificationsResponse = Either<NotificationNotFoundError, null>

export class DeleteNotifications {
  constructor(private notificationsRepository: INotificationsRepository) {}

  async execute({
    notificationId,
  }: DeleteNotificationsRequest): Promise<DeleteNotificationsResponse> {
    const notificationExists = await this.notificationsRepository.findById(notificationId)

    if (!notificationExists) {
      return left(new NotificationNotFoundError())
    }

    await this.notificationsRepository.delete(notificationId)

    return right(null)
  }
}
