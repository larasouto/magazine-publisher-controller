import { z } from 'zod'

export const GraphicsOrdersReturnsSchema = z.object({
  returnDate: z.coerce.date(),
  returnNumber: z.number().min(0),
  graphicsOrderId: z.string().uuid()
})

export type GraphicsOrdersReturnForm = z.infer<
  typeof GraphicsOrdersReturnsSchema
>
export type GraphicsOrdersReturnsFormWithId = GraphicsOrdersReturnForm & {
  id: string
}
