import { params } from '@/utils/custom-message'
import CPF from 'cpf'
import { z } from 'zod'

export enum PhotographerStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  VACATION = 'VACATION',
  PAUSED = 'PAUSED'
}

export const PhotographerSchema = z.object({
  name: z.string().nonempty().max(64),
  email: z.string().email(),
  phone: z.string().nullish(),
  cpf: z
    .string()
    .refine((value) => CPF.isValid(value), params({ key: 'invalid_cpf' })),
  specialty: z.string().min(2).max(64),
  status: z
    .nativeEnum(PhotographerStatus)
    .default(PhotographerStatus.ACTIVE)
    .nullish(),
  entryDate: z.coerce
    .date()
    .min(new Date(1970, 1, 1))
    .max(new Date()),
  departureDate: z.coerce.date().nullish()
})

export type PhotographerForm = z.infer<typeof PhotographerSchema>
export type PhotographerFormWithId = PhotographerForm & { id: string }
