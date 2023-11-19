import { z } from 'zod'

export const BookstoreOrderReturnsSchema = z.object({
  returnDate: z.coerce.date(),
  returnNumber: z.number().min(0),
  graphicsOrderId: z.string().uuid(),
})

export type BookstoreOrderReturnForm = z.infer<typeof BookstoreOrderReturnsSchema>
export type BookstoreOrderReturnsFormWithId = BookstoreOrderReturnForm & { id: string }
