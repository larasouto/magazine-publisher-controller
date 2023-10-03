import { z } from 'zod'

export const NewsReportsSchema = z.object({
  title: z.string().min(2).max(64),
  numberOfPages: z.coerce.number().positive(),
  initialPage: z.coerce.number().positive(),
  finalPage: z.coerce.number().positive(),
  numberOfPhotos: z.coerce.number().positive(),
  photographerId: z.string().uuid(),
  reporterId: z.string().uuid(),
  categoryId: z.string().uuid()
})

export type NewsReportForm = z.infer<typeof NewsReportsSchema>
export type NewsReportFormWithId = NewsReportForm & { id: string }
