import { z } from 'zod'

export const OrderItemSchema = z.object({
  orderId: z.string().uuid(),
  productId: z.string().uuid(),
  quantity: z.number().positive(),
})

export type OrderItemProps = z.infer<typeof OrderItemSchema>
