import { z } from 'zod'
import { Zip } from '@/core/domain/zip'

export const AddressSchema = z.object({
  street: z.string().min(2).max(64),
  number: z.number().min(1).max(99999),
  city: z.string().min(1).max(64),
  state: z.string().min(1).max(64),
  zip: z.string().refine((value) => Zip.validate(value), {
    message: 'Invalid zip code',
  }),
  complement: z.string().max(64).nullish(),
  userId: z.string().uuid(),
})

export type AddressProps = z.infer<typeof AddressSchema>
