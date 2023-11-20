import { z } from 'zod'

export const ArticleSchema = z.object({
  imagePaths: z.array(z.string()),
  title: z.string().min(1).max(64),
  subtitle: z.string().min(1).max(64),
  text: z.string().min(1).max(255),
  editionId: z.string().uuid(),
  categoryId: z.string().uuid(),
  themeId: z.string().uuid(),
  numberOfPages: z.number().min(1).max(64),
  initialPage: z.number().nonnegative(),
  finalPage: z.number().nonnegative(),
  reporters: z.array(z.string().uuid()),
  photographers: z.array(z.string().uuid())
})

export type ArticleData = z.infer<typeof ArticleSchema>
export type ArticleDataWithId = ArticleData & { id: string }
