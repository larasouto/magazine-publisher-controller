import { params } from '@/utils/custom-message'
import { z } from 'zod'

export const EditionSchema = z.object({
  number: z.coerce.number().nonnegative().int().min(1),
  title: z.string().min(2).max(64),
  description: z.string().max(256).nullish(),
  coverPath: z
    .string()
    .refine((c) => c.length > 1, params({ key: 'required_field' })),
  price: z.coerce.number().positive(),
  year: z.coerce.number().min(1900).max(2023),
  publicationDate: z.coerce.date(),
  numberOfCopies: z.coerce.number().positive().int(),
  numberOfPages: z.coerce.number().positive().int(),
  magazineId: z.string().uuid()
})

export type EditionForm = z.infer<typeof EditionSchema>
export type EditionFormWithId = EditionForm & { id: string }
