import { z } from 'zod'

export const AdPricesSchema = z.object({
  bannerPrice: z.coerce.number().positive(),
  wholePagePrice: z.coerce.number().positive(),
  doublePagePrice: z.coerce.number().positive(),
  beginningPrice: z.coerce.number().positive(),
  middlePrice: z.coerce.number().positive(),
  endPrice: z.coerce.number().positive(),
  magazineId: z.string().uuid({ message: 'Obrigatório' })
})

export type AdPriceForm = z.infer<typeof AdPricesSchema>
export type AdPricesFormWithId = AdPriceForm & { id: string }
