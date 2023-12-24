import { z } from 'zod'

export enum CouponType {
  PERCENTAGE = 0,
  FIXED_VALUE = 1,
}

export const CouponsSchema = z.object({
  couponCode: z.string().min(1).max(64),
  discountAmount: z.coerce.number().positive(),
  expirationDate: z.coerce.date(),
  type: z.coerce.number(),
  sendNotification: z.boolean().default(false),
})

export type CouponForm = z.infer<typeof CouponsSchema>
export type CouponsFormWithId = CouponForm & { id: string }
