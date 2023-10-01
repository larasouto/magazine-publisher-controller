import { z } from 'zod'

export enum PublicationPeriod {
  ANNUALLY = 'ANNUALLY',
  BIANNUAL = 'BIANNUAL',
  MONTHLY = 'MONTHLY',
  BIMONTHLY = 'BIMONTHLY',
  WEEKLY = 'WEEKLY',
}

export const MagazineSchema = z.object({
  name: z.string().min(3).max(64),
  description: z.string().max(64).nullish(),
  yearFounded: z.number().min(1900).max(2023),
  publicationPeriod: z.nativeEnum(PublicationPeriod),
  themeId: z.string().uuid(),
})

export type MagazineProps = z.infer<typeof MagazineSchema>
