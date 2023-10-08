import CPF from 'cpf'
import { z } from 'zod'

export enum PhotographerStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  VACATION = 'VACATION',
  PAUSED = 'PAUSED',
}

export const PhotographerSchema = z.object({
  avatar: z.string().nullish(),
  name: z.string().min(2).max(64),
  email: z.string().email(),
  phone: z.string().nullish(),
  cpf: z.string().refine((value) => CPF.isValid(value), {
    message: 'Invalid CPF',
  }),
  specialty: z.string().min(2).max(64),
  status: z
    .nativeEnum(PhotographerStatus)
    .default(PhotographerStatus.ACTIVE)
    .nullish(),
  entryDate: z.coerce.date(),
  departureDate: z.coerce.date().nullish(),
})

export type PhotographerProps = z.infer<typeof PhotographerSchema>
