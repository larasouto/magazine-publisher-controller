import { z } from 'zod'

export const ArticleSchema = z.object({
  title: z.string().min(1).max(64),
  subtitle: z.string().min(1).max(64),
  text: z.string().min(1).max(255),
  editionId: z.string().uuid(),
  categoryId: z.string().uuid(),
  themeId: z.string().uuid(),
  numberOfPages: z.number().min(1).max(64),
  initialPage: z.number().nonnegative(),
  finalPage: z.number().nonnegative(),
})

export const ArticleItemsSchema = z.object({
  reporters: z.array(z.string().uuid()),
  photographers: z.array(z.string().uuid()),
})

export type ArticleProps = z.infer<typeof ArticleSchema>
export type ArticleItemsProps = z.infer<typeof ArticleItemsSchema>
