import { z } from 'zod'

export enum SubscriptionType {
  BASIC = 0,
  STANDARD = 1,
  PREMIUM = 2,
}

export enum SubscriptionFrequency {
  WEEKLY = 0,
  MONTHLY = 1,
  BIANNUAL = 2,
  ANNUAL = 3,
}

export const SubscriptionSchema = z.object({
  name: z.string().min(2).max(64),
  description: z.string().min(2).max(264),
  type: z.nativeEnum(SubscriptionType),
  frequency: z.nativeEnum(SubscriptionFrequency),
  price: z.coerce.number().positive(),
  magazineId: z.string().uuid(),
})

export type SubscriptionProps = z.infer<typeof SubscriptionSchema>
