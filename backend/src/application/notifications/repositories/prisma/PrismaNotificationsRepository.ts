import { prismaClient } from '@/infra/prisma/client'
import { NotificationMapper } from '../../mappers/notification.mapper'
import { INotificationsRepository } from '../interfaces/INotificationsRepository'
import { Notification } from '../../domain/notification'
import { v4 as uuid } from 'uuid'

export class PrismaNotificationsRepository implements INotificationsRepository {
  async findById(id: string): Promise<Notification | null> {
    const notification = await prismaClient.notification.findUnique({
      where: { id },
    })

    if (!notification) {
      return null
    }

    return NotificationMapper.toDomain(notification)
  }

  async deleteMany(ids: string[]): Promise<void> {
    await prismaClient.notification.deleteMany({
      where: { id: { in: ids } },
    })
  }

  async sendNotification(
    subject: string,
    message: string,
    coupon_id: string,
    user_id: string,
  ): Promise<void> {
    await prismaClient.notification.create({
      data: {
        id: uuid(),
        subject,
        message,
        send_date: new Date(),
        coupon_id,
        user_id,
      },
    })
  }

  async markAsRead(id: string): Promise<void> {
    await prismaClient.notification.update({
      where: { id },
      data: { read: true },
    })
  }

  async markAllAsRead(): Promise<void> {
    await prismaClient.notification.updateMany({
      where: { read: false },
      data: { read: true },
    })
  }

  async listByUser(user_id: string): Promise<Notification[]> {
    const notifications = await prismaClient.notification.findMany({
      where: { user_id },
    })

    return notifications.map((notification) =>
      NotificationMapper.toDomain(notification),
    )
  }

  async delete(id: string): Promise<void> {
    await prismaClient.notification.delete({
      where: { id },
    })
  }
}
