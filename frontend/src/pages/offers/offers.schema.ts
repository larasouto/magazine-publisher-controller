import { z } from 'zod'

export const OffersSchema = z.object({
  discountPercentage: z.number().positive().max(100),
  dates: z.object({
    from: z.coerce.date(),
    to: z.coerce.date(),
  }),
  editions: z.array(z.string().uuid()).nullish(),
})

export type OfferForm = z.infer<typeof OffersSchema>
export type OffersFormWithId = OfferForm & { id: string }
