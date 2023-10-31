import { z } from 'zod'

export const AddressesSchema = z.object({
  street: z.string().min(1).max(64),
  number: z.coerce.number().min(1).max(99999),
  city: z.string().min(1).max(64),
  state: z.string().min(1).max(64),
  zip: z.string().min(9).max(9),
  complement: z.string().max(64).nullish()
})

export type AddressesData = z.infer<typeof AddressesSchema>
export type AddressesDataWithId = AddressesData & { id: string }
