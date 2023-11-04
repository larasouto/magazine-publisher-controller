import { z } from 'zod'

export enum OrderStatus {
  PENDING = 0,
  APPROVED = 1,
  CANCELED = 2,
}

export const OrderSchema = z.object({
  totalValue: z.coerce.number().positive(),
  status: z.nativeEnum(OrderStatus),
  addressId: z.string().uuid(),
  cardId: z.string().uuid(),
  customerId: z.string().uuid(),
})

export type OrderProps = z.infer<typeof OrderSchema>
