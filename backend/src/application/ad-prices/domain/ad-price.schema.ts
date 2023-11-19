import { z } from 'zod'

export const AdPriceSchema = z.object({
  bannerPrice: z.number().nonnegative(),
  wholePagePrice: z.number().nonnegative(),
  doublePagePrice: z.number().nonnegative(),
  beginningPrice: z.number().nonnegative(),
  middlePrice: z.number().nonnegative(),
  endPrice: z.number().nonnegative(),
  magazineId: z.string().uuid(),
})

export type AdPriceProps = z.infer<typeof AdPriceSchema>
