import { z } from 'zod'

export enum Status {
  onHold = 'on hold', // em espera
  inPreparation = 'in preparation', // em preparação
  onMyWay = 'on my way', // esta a caminho
  deliv = 'delivered' // entregue
}

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
