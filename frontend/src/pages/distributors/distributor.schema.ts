import { z } from 'zod'

export enum DistributorRegion {
  SOUTH = 1,
  SOUTHEAST = 2,
  CENTRALWEST = 3,
  NORTHEAST = 4,
  NORTH = 5
}

export const DistributorsSchema = z.object({
  name: z.string().min(2).max(64),
  street: z.string().min(2).max(64),
  number: z.coerce.number().min(1).max(99999),
  city: z.string().min(1).max(64),
  state: z.string().min(1).max(64),
  zip: z.string().min(9).max(9),
  complement: z.string().max(64).nullish(),
  region: z.coerce.number().positive()
})

export type DistributorsForm = z.infer<typeof DistributorsSchema>
export type DistributorsFormWithId = DistributorsForm & { id: string }
