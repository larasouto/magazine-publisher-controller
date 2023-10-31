import { z } from 'zod'

export enum AdvertisingCategory {
  PREMIUM = 0,
  STANDARD = 1,
  BASIC = 2,
}

export const AdvertisingSchema = z.object({
  name: z.string().min(1).max(64),
  description: z.string().min(1).max(255).nullish(),
  category: z.nativeEnum(AdvertisingCategory),
  numberOfPages: z.coerce.number().nonnegative().int(),
  price: z.coerce.number().nonnegative(),
  magazineId: z.string().uuid(),
})

export type AdvertisingProps = z.infer<typeof AdvertisingSchema>
