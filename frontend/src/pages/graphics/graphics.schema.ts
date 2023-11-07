import { z } from 'zod'

export const GraphicsSchema = z.object({
  name: z.string().min(2).max(64),
  address: z.string().max(64).min(2)
})

export type GraphicForm = z.infer<typeof GraphicsSchema>
export type GraphicsFormWithId = GraphicForm & { id: string }
