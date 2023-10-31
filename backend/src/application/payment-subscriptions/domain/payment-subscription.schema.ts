import { z } from 'zod'

export enum PaymentSubscriptionStatus {
  PENDING = 0,
  APPROVED = 1,
  CANCELED = 2,
}

export const PaymentSubscriptionSchema = z.object({
  subscriptionId: z.string().uuid(),
  status: z.nativeEnum(PaymentSubscriptionStatus),
  addressId: z.string().uuid(),
  cardId: z.string().uuid(),
  customerId: z.string().uuid(),
})

export type PaymentSubscriptionProps = z.infer<typeof PaymentSubscriptionSchema>
