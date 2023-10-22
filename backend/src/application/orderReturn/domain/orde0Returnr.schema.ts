import { z } from 'zod'

export const OrderReturnSchema = z.object({
  returnDate: z.coerce.date(),
  returnNumber: z.number().min(0),
  orderId: z.string().uuid(),
})

export type OrderReturnProps = z.infer<typeof OrderReturnSchema>
