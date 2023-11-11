import { z } from 'zod'

export const GraphicsSchema = z.object({
  name: z.string().min(3).max(100),
  address: z.string().max(100).nullish()
})

export type GraphicForm = z.infer<typeof GraphicsSchema>
export type GraphicsFormWithId = GraphicForm & { id: string }
