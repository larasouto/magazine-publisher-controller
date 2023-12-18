import { z } from 'zod'
export enum Status {
  emEspera= 'em espera', // em espera
  emPreparacao = ' em preparação', // em preparação
  estaACaminho = 'esta a caminho', // esta a caminho
  entregue = 'entregue' // entregue
}

export const GraphicsOrderSchema = z.object({
  receiptDate: z.coerce.date().nullable(),
  departureDate: z.coerce.date(),
  status: z.nativeEnum(Status),
  deliveryAddress: z.string().max(64),
  exampleNumber: z.number().min(0).max(100000),
  price: z.coerce.number().nonnegative(),
  editionId: z.string().uuid(),
  graphicsDistributorId: z.string().uuid(),
  bookstoreId: z.string().uuid(),
})

export type GraphicsOrderProps = z.infer<typeof GraphicsOrderSchema>
