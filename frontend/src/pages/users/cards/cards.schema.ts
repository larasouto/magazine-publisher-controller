import { z } from 'zod'

export enum CardType {
  CREDIT = 0,
  DEBIT = 1
}

export const CardSchema = z.object({
  holder: z.string().min(1).max(64),
  number: z.string().min(19).max(19),
  expirationDate: z.string().min(7).max(7),
  securityCode: z.string().min(3).max(3),
  billingAddress: z.string().min(1).max(264),
  phone: z.string().nullish(),
  type: z.coerce.number().int(),
  flag: z.string().min(1).max(64)
})

export type CardData = z.infer<typeof CardSchema>
export type CardDataWithId = CardData & { id: string }
