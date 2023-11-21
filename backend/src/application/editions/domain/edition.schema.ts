import { z } from 'zod'

export const EditionSchema = z.object({
  number: z.coerce.number().positive().int(),
  title: z.string().min(2).max(64),
  coverPath: z.string().nonempty(),
  description: z.string().max(256).nullish(),
  price: z.coerce.number().positive(),
  year: z.coerce.number().min(1900).max(2023),
  publicationDate: z.coerce.date(),
  numberOfCopies: z.coerce.number().positive().int(),
  numberOfPages: z.coerce.number().positive().int(),
  magazineId: z.string().uuid(),
  isTopSeller: z.boolean(),
})

export type EditionProps = z.infer<typeof EditionSchema>
