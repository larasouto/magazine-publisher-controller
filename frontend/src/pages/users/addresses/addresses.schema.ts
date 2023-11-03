import { z } from 'zod'

export const AddressesSchema = z.object({
  street: z.string().min(2).max(64),
  number: z.number().min(1).max(99999),
  city: z.string().min(1).max(64),
  state: z.string().min(1).max(64),
  zip: z.string(),
  complement: z.string().max(64).nullish()
})

export type AddressesData = z.infer<typeof AddressesSchema>
export type AddressesDataWithId = AddressesData & { id: string }
