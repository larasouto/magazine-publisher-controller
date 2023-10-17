import { z } from 'zod'

export const GraphicsSchema = z.object({
  name: z.string().min(2).max(64),
  address: z.string().max(64).nonempty(),
})

export type GraphicsProps = z.infer<typeof GraphicsSchema>
