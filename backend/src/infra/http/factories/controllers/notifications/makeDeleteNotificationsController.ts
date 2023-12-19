import { PrismaNotificationsRepository } from '@/application/notifications/repositories/prisma/PrismaNotificationsRepository'
import { DeleteNotifications } from '@/application/notifications/use-cases/delete-notification/delete-notification'
import { DeleteNotificationsontroller } from '@/application/notifications/use-cases/delete-notification/delete-notification.controller'
import { Controller } from '@/core/infra/controller'
import { ValidatorCompositor } from '@/infra/validation/ValidatorCompositor'

export function makeDeleteNotificationController(): Controller {
  const prismaNotificationRepository = new PrismaNotificationsRepository()
  const useCaseDeleteNotification = new DeleteNotifications(
    prismaNotificationRepository,
  )

  const validator = new ValidatorCompositor([])

  return new DeleteNotificationsontroller(validator, useCaseDeleteNotification)
}
