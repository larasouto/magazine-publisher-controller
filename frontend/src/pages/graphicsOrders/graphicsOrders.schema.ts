import { z } from 'zod'

export enum Status {
  onHold = 'on hold', // em espera
  inPreparation = 'in preparation', // em preparação
  onMyWay = 'on my way', // esta a caminho
  deliv = 'delivered' // entregue
}

export const GraphicsOrdersSchema = z.object({
  receiptDate: z.date().nullable(),
  departureDate: z.coerce.date(),
  status: z.nativeEnum(Status),
  deliveryAddress: z.string().max(64),
  exampleNumber: z.number().min(0).max(100000),
  price: z.coerce.number().nonnegative(),
  editionId: z.string().uuid(),
  graphicsDistributorId: z.string().uuid(),
  bookstoreId: z.string().uuid()
})

export type GraphicsOrderForm = z.infer<typeof GraphicsOrdersSchema>
export type GraphicsOrdersFormWithId = GraphicsOrderForm & { id: string }
