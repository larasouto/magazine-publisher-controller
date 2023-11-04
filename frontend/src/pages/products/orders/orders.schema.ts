import { z } from 'zod'

export enum PaymentMethod {
  CREDIT_CARD = 0,
  DEBIT_CARD = 1,
  BOLETO = 2
}

export enum OrderStatus {
  PENDING = 0,
  APPROVED = 1,
  CANCELED = 2
}

export const OrderSchema = z.object({
  totalValue: z.coerce.number().positive(),
  status: z.coerce.number().int().default(OrderStatus.PENDING),
  addressId: z.string().uuid(),
  cardId: z.string().uuid(),
  items: z.array(
    z.object({
      editionId: z.string().uuid(),
      quantity: z.coerce.number().positive()
    })
  )
})

export type OrdersData = z.infer<typeof OrderSchema>
export type OrdersDataWithId = OrdersData & { id: string }
