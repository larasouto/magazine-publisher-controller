import { z } from 'zod'

export const ReviewSchema = z.object({
  title: z.string().min(1).max(64),
  review: z.string().min(1).max(255),
  rating: z.coerce.number().min(0).max(5),
  editionId: z.string().uuid(),
  reviewerId: z.string().uuid(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
})

export type ReviewProps = z.infer<typeof ReviewSchema>
