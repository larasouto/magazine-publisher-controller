import { PrismaNotificationsRepository } from '@/application/notifications/repositories/prisma/PrismaNotificationsRepository'
import { ListNotifications } from '@/application/notifications/use-cases/list-notifications/list-notification'
import { ListNotificationController } from '@/application/notifications/use-cases/list-notifications/list-notification.controller'
import { Controller } from '@/core/infra/controller'

export function makeListNotificationsByUserController(): Controller {
  const prismaNotificationsRepository = new PrismaNotificationsRepository()
  const useCaseListNotification = new ListNotifications(
    prismaNotificationsRepository,
  )

  return new ListNotificationController(useCaseListNotification)
}
