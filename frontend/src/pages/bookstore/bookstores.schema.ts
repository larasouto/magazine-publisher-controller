import { z } from 'zod'

export const BookstoresSchema = z.object({
  address: z.string().max(100).nullish()
})

export type BookstoreForm = z.infer<typeof BookstoresSchema>
export type BookstoresFormWithId = BookstoreForm & { id: string }
