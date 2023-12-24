import { MapperError } from '@/core/errors/MapperErrors'
import { Notification as PersistenceNotification } from '@prisma/client'
import { Notification } from '../domain/notification'

export class NotificationMapper {
  static toDomain(raw: PersistenceNotification) {
    const notificationOrError = Notification.create(
      {
        subject: raw.subject,
        message: raw.message,
        read: raw.read,
        sendDate: raw.send_date,
        couponId: raw.coupon_id,
        offerId: raw.offer_id,
        subscriptionId: raw.subscription_id,
      },
      raw.id,
    )

    if (notificationOrError.isLeft()) {
      throw new MapperError(notificationOrError.value.message)
    }

    return notificationOrError.value
  }

  static async toPersistence(notification: Notification) {
    return {
      id: notification.id,
      subject: notification.props.subject,
      message: notification.props.message,
      read: notification.props.read,
      send_date: notification.props.sendDate,
      coupon_id: notification.props.couponId,
      offer_id: notification.props.offerId,
      subscription_id: notification.props.subscriptionId,
    }
  }
}
