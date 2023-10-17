import { z } from 'zod'
export enum Status {
  onHold = 'on hold',
  inPreparation = 'in preparation',
  onMyWay = 'on my way',
  deliv = 'delivered',
}

export const OrderSchema = z.object({
  receiptDate: z.coerce.date(),
  departureDate: z.coerce.date(),
  status: z.nativeEnum(Status),
  deliveryAddress: z.string().max(64).nonempty(),
  exampleNumber: z.number().min(0).max(100000),
  price: z.coerce.number().nonnegative(),
  editonId: z.string().uuid(),
  graphicsDistributorId: z.string().uuid(),
})

export type OrderProps = z.infer<typeof OrderSchema>
