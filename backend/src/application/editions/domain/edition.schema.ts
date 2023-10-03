import { z } from 'zod'

export const EditionSchema = z.object({
  number: z.coerce.number().nonnegative().int(),
  title: z.string().min(2).max(64),
  coverPath: z.string().nonempty(),
  description: z.string().max(256).nullish(),
  price: z.coerce.number().nonnegative(),
  year: z.number().min(1900).max(2023),
  publicationDate: z.coerce.date(),
  numberOfCopies: z.coerce.number().nonnegative().int(),
  numberOfPages: z.coerce.number().nonnegative().int(),
  magazineId: z.string().uuid(),
})

export type EditionProps = z.infer<typeof EditionSchema>
