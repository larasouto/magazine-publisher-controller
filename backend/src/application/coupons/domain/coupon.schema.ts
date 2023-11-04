import { Phone } from '@/core/domain/phone'
import { z } from 'zod'

export enum CouponType {
  PORCETAGEM = 0,
  VALORFIXO = 1,
}

export const CouponSchema = z.object({
  couponCode: z.string().min(1).max(64),
  discountAmount: z.coerce.number().positive(),
  expirationDate: z.string().min(7).max(7),
  maximumAmountOfUse: z.coerce.number().positive(),
  type: z.nativeEnum(CouponType),
  userId: z.string().uuid(),
})

export type CouponProps = z.infer<typeof CouponSchema>
