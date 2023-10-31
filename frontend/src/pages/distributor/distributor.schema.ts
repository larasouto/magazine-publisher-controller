import { z } from 'zod'

export const DistributorsSchema = z.object({
  name: z.string().min(2).max(64),
  address: z.string().max(64).min(2),
  region: z.string().max(64).min(2),
})

export type DistributorsForm = z.infer<typeof DistributorsSchema>
export type DistributorsFormWithId = DistributorsForm & { id: string }
