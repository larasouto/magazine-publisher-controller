import { z } from 'zod'

export const AdvertisingSchema = z.object({
  name: z.string().min(3).max(64),
  categoryAdvertising: z.string().min(3).max(64),
  numberOfPages: z.coerce.number().nonnegative().int(),
  price: z.coerce.number().nonnegative(),
  //magazineId: z.string().uuid()
})

export type AdvertisingProps = z.infer<typeof AdvertisingSchema>