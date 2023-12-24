import { z } from 'zod'

export const NotificationSchema = z.object({
  subject: z.string().max(64),
  message: z.string().max(64).nullish(),
  read: z.boolean().default(false),
  sendDate: z.coerce.date(),
  couponId: z.string().uuid().nullish(),
  offerId: z.string().uuid().nullish(),
  subscriptionId: z.string().uuid().nullish(),
})

export type NotificationProps = z.infer<typeof NotificationSchema>
