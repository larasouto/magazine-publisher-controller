import { z } from 'zod'

export const ArticleSchema = z.object({
  imagePath: z.string(),
  title: z.string().min(1).max(64),
  subtitle: z.string().min(1).max(64),
  text: z.string().min(1).max(255),
  editionId: z.string().uuid(),
  categoryId: z.string().uuid(),
  themeId: z.string().uuid(),
  numberOfPages: z.coerce.number().min(1).max(64),
  initialPage: z.coerce.number().nonnegative(),
  finalPage: z.coerce.number().nonnegative(),
  reporters: z.array(z.string()),
  photographers: z.array(z.string()),
  isTopSeller: z.boolean().optional().default(false)
})

export type ArticleData = z.infer<typeof ArticleSchema>
export type ArticleDataWithId = ArticleData & { id: string }
