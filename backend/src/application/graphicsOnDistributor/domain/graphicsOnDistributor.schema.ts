import { z } from 'zod'

export const GraphicsOnDistributorSchema = z.object({
  graphicsId: z.string().uuid(),
  distributorId: z.string().uuid(),
})

export type GraphicsOnDistributorsProps = z.infer<typeof GraphicsOnDistributorSchema>
