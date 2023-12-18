import { z } from 'zod'

export enum OrderStatus {
  PENDING = 0,
  APPROVED = 1,
  CANCELED = 2,
}

export const OrderSchema = z.object({
  totalValue: z.coerce.number().positive(),
  status: z.nativeEnum(OrderStatus),
  addressId: z.string().uuid().optional(),
  cardId: z.string().uuid().optional(),
  customerId: z.string().uuid(),
  orderItems: z
    .array(
      z.object({
        editionId: z.string().uuid(),
        quantity: z.number().positive(),
      }),
    )
    .optional(),
})

export const OrderItemSchema = z.object({
  editionId: z.string().uuid(),
  quantity: z.number().positive(),
})

export type OrderItemProps = z.infer<typeof OrderItemSchema>
export type OrderProps = z.infer<typeof OrderSchema>
