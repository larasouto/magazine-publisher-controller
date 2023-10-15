import { z } from 'zod'

export const DistributorSchema = z.object({
  name: z.string().min(2).max(64),
  address: z.string().max(64).nonempty(),
  region: z.string().max(64).nonempty(),
})

export type DsitributorProps = z.infer<typeof DistributorSchema>
