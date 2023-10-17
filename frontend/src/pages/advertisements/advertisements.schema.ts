import { z } from 'zod'

export const AdvertisingSchema = z.object({
  name: z.string().min(3).max(64),
  categoryAdvertising: z.string().min(3).max(64),
  numberOfPages: z.coerce.number().nonnegative().int(),
  price: z.coerce.number().nonnegative()
})

export type AdvertisingForm = z.infer<typeof AdvertisingSchema>
export type AdvertisingFormWithId = AdvertisingForm & { id: string }