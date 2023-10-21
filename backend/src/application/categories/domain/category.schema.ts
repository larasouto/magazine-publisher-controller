import { z } from 'zod'

export const CategorySchema = z.object({
  name: z.string().min(1).max(64),
  description: z.string().max(64).nullish(),
})

export type CategoryProps = z.infer<typeof CategorySchema>
