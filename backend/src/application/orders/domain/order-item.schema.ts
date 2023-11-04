import { z } from 'zod'

export const OrderItemSchema = z.object({
  itemId: z.string().uuid(),
  orderId: z.string().uuid(),
  quantity: z.number().positive(),
})

export type OrderItemProps = z.infer<typeof OrderItemSchema>
