import { z } from 'zod'

export enum CouponType {
  PERCENTAGE = 0,
  FIXED_VALUE = 1
}

export const CouponSchema = z.object({
  couponCode: z.string().min(1).max(64),
  discountAmount: z.coerce.number().positive(),
  expirationDate: z.coerce.date(),
  availableQuantity: z.coerce.number().positive(),
  type: z.coerce.number().int()
})

export type CouponData = z.infer<typeof CouponSchema>
export type CouponDataWithId = CouponData & { id: string }
