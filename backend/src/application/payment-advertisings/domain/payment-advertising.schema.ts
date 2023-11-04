import { z } from 'zod'

export enum PaymentAdvertisingStatus {
  PENDING = 0,
  APPROVED = 1,
  CANCELED = 2,
}

export const PaymentAdvertisingSchema = z.object({
  advertisingId: z.string().uuid(),
  status: z.nativeEnum(PaymentAdvertisingStatus),
  addressId: z.string().uuid(),
  cardId: z.string().uuid(),
  customerId: z.string().uuid(),
})

export type PaymentAdvertisingProps = z.infer<typeof PaymentAdvertisingSchema>
