import { z } from 'zod'

export const DistributorSchema = z.object({
  name: z.string().min(2).max(64),
  address: z.string().max(64).min(2),
  region: z.string().max(64).min(2),
})

export type DsitributorProps = z.infer<typeof DistributorSchema>
