import { Notification } from '../../domain/notification'

export interface INotificationsRepository {
  findById(id: string): Promise<Notification | null>
  sendNotification(
    subject: string,
    message: string,
    coupon_id: string,
    user_id: string,
  ): Promise<void>
  markAsRead(id: string): Promise<void>
  markAllAsRead(): Promise<void>
  delete(id: string): Promise<void>
  listByUser(user_id: string): Promise<Notification[]>
}
