import { z } from 'zod'

export enum PublicationPeriod {
  WEEKLY = 0,
  MONTHLY = 1,
  BIMONTHLY = 2,
  ANNUALLY = 3,
  BIANNUAL = 4
}

export const MagazineSchema = z.object({
  name: z.string().min(3).max(64),
  description: z.string().max(64).nullish(),
  yearFounded: z.coerce.number().min(1900).max(new Date().getFullYear()),
  publicationPeriod: z.coerce.number().int(),
  themeId: z.string().uuid()
})

export type MagazineForm = z.infer<typeof MagazineSchema>
export type MagazineFormWithId = MagazineForm & { id: string }
