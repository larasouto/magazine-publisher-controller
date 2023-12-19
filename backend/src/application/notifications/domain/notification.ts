import { Entity } from '@/core/domain/entity'
import { ZodValidationError } from '@/core/domain/errors/ZodValidationError'
import { Either, left, right } from '@/core/logic/either'
import { NotificationProps, NotificationSchema } from './notification.schema'

export class Notification extends Entity<NotificationProps> {
  private constructor(props: NotificationProps, id?: string) {
    super(props, id)
  }

  static create(props: NotificationProps, id?: string): Either<Error, Notification> {
    const result = NotificationSchema.safeParse(props)

    if (!result.success) {
      return left(new ZodValidationError(result.error))
    }

    return right(new Notification(result.data, id))
  }
}
