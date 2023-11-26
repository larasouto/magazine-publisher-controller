import { z } from 'zod'

export enum SubscriptionStatus {
  ACTIVE,
  INACTIVE,
}

export const SubscriptionSchema = z.object({
  subscriptionId: z.string().uuid(),
  userId: z.string().uuid(),
  status: z.nativeEnum(SubscriptionStatus),
})

export type SubscriptionProps = z.infer<typeof SubscriptionSchema>
