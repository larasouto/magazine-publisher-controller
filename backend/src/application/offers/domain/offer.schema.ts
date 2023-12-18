import { z } from 'zod'

export const OfferSchema = z.object({
  discountPercentage: z.number().positive().max(100),
  dates: z.object({
    from: z.coerce.date(),
    to: z.coerce.date(),
  }),
  editions: z.array(z.string().uuid()).nullish(),
})

export const OfferItemsSchema = z.object({
  editions: z.array(z.string().uuid()),
})

export type OfferProps = z.infer<typeof OfferSchema>
export type OfferItemsProps = z.infer<typeof OfferItemsSchema>
