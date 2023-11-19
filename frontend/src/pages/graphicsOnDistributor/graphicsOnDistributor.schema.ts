import { z } from 'zod'

export const GraphocsOnDistributorsSchema = z.object({
  graphicsId: z.string().uuid(),
  distributorId: z.string().uuid(),
})

export type GraphocsOnDistributorForm = z.infer<typeof GraphocsOnDistributorsSchema>
export type GraphocsOnDistributorsFormWithId = GraphocsOnDistributorForm & { id: string }
