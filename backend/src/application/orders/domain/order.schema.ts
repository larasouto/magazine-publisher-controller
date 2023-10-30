import { z } from 'zod'

export enum PaymentMethod {
  CREDIT_CARD = 0,
  DEBIT_CARD = 1,
  BOLETO = 2,
}

export enum OrderStatus {
  PENDING = 0,
  APPROVED = 1,
  CANCELED = 2,
}

export const OrderSchema = z.object({
  totalValue: z.coerce.number().positive(),
  status: z.nativeEnum(OrderStatus),
  addressId: z.string().uuid(),
  paymentMethod: z.nativeEnum(PaymentMethod),
  customerId: z.string().uuid(),
})

export type OrderProps = z.infer<typeof OrderSchema>
