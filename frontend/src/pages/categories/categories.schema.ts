import { z } from 'zod'

export const CategorySchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().max(100).nullish()
})

export type CategoryForm = z.infer<typeof CategorySchema>
export type CategoryFormEdit = CategoryForm & { id: string }
