import { z } from 'zod'

export const ArticleSchema = z.object({
  imagePath: z.string(),
  title: z.string().min(1).max(64),
  subtitle: z.string().min(1).max(255),
  text: z.string().min(1),
  editionId: z.string().uuid(),
  categoryId: z.string().uuid(),
  themeId: z.string().uuid(),
  numberOfPages: z.coerce.number().min(1).max(64),
  initialPage: z.coerce.number().nonnegative(),
  finalPage: z.coerce.number().nonnegative(),
  isTopSeller: z.boolean(),
  reporters: z.array(z.string().uuid()).optional(),
  photographers: z.array(z.string().uuid()).optional(),
})

export const ArticleItemsSchema = z.object({
  reporters: z.array(z.string().uuid()),
  photographers: z.array(z.string().uuid()),
})

export type ArticleProps = z.infer<typeof ArticleSchema>
export type ArticleItemsProps = z.infer<typeof ArticleItemsSchema>
