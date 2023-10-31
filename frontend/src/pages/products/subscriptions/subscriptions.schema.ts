import { z } from 'zod'

export enum PaymentSubscriptionStatus {
  PENDING = 0,
  APPROVED = 1,
  CANCELED = 2
}

export const PaymentSubscriptionSchema = z.object({
  subscriptionId: z.string().uuid(),
  addressId: z.string().uuid(),
  cardId: z.string().uuid()
})

export type PaymentSubscriptionProps = z.infer<typeof PaymentSubscriptionSchema>
