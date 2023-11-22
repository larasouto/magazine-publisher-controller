import { z } from 'zod'

export const JobOpportunitySchema = z.object({
  office: z.string().min(2).max(64),
  requirements: z.string().min(2).max(64),
  hours: z.coerce.number().positive(),
  wage: z.coerce.number().nonnegative(),
})

export type JobOpportunityProps = z.infer<typeof JobOpportunitySchema>
