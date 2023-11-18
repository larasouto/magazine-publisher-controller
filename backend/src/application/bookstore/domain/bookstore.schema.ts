import { z } from 'zod'

export const BookstoreSchema = z.object({
  address: z.string().max(64).min(2),
  name: z.string().max(64).min(2),
})

export type BookstoreProps = z.infer<typeof BookstoreSchema>
