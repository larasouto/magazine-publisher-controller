import { z } from 'zod'

export const JobOpportunittySchema = z.object({
  office: z.string().min(2).max(64),
  requirements: z.string().min(2).max(64),
  hours: z.coerce.number().positive(),
  wage: z.coerce.number().nonnegative(),
  name: z.string().min(2).max(64),
})

export type JobOpportunittyProps = z.infer<typeof JobOpportunittySchema>
