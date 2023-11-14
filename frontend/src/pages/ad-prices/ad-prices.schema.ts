import { z } from 'zod'

export const AdPricesSchema = z.object({
  bannerPrice: z.coerce.number().nonnegative(),
  wholePagePrice: z.coerce.number().nonnegative(),
  doublePagePrice: z.coerce.number().nonnegative(),
  beginningPrice: z.coerce.number().nonnegative(),
  middlePrice: z.coerce.number().nonnegative(),
  endPrice: z.coerce.number().nonnegative(),
  magazineId: z.string().uuid()
})

export type AdPriceForm = z.infer<typeof AdPricesSchema>
export type AdPricesFormWithId = AdPriceForm & { id: string }
