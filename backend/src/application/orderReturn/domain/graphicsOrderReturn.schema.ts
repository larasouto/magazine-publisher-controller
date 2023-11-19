import { z } from 'zod'

export const GraphicsOrderReturnSchema = z.object({
  returnDate: z.coerce.date(),
  returnNumber: z.number().min(0),
  graphicsOrderId: z.string().uuid(),
})

export type GraphicsOrderReturnProps = z.infer<typeof GraphicsOrderReturnSchema>
