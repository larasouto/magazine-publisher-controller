import { Phone } from '@/core/domain/phone'
import { z } from 'zod'

export enum CardType {
  CREDIT = 0,
  DEBIT = 1,
}

export const CardSchema = z.object({
  holder: z.string().min(2).max(64),
  number: z.string().min(16).max(16),
  expirationDate: z.string().min(7).max(7),
  securityCode: z.number().min(0).max(999),
  billingAddress: z.string().min(1).max(264),
  phone: z
    .string()
    .refine((phone) => Phone.validate(phone), {
      message: 'Invalid phone number',
    })
    .nullish(),
  type: z.nativeEnum(CardType),
  flag: z.string().min(1).max(64),
  userId: z.string().uuid(),
})

export type CardProps = z.infer<typeof CardSchema>
