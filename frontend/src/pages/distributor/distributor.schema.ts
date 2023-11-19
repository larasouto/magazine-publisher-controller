import { z } from 'zod'

export const DistributorsSchema = z.object({
  name: z.string().min(3).max(100),
  address: z.string().max(100).nullish(),
  region: z.string().max(100).nullish()
})

export type DistributorsForm = z.infer<typeof DistributorsSchema>
export type DistributorsFormWithId = DistributorsForm & { id: string }
