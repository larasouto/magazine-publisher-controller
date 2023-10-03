import { params } from '@/utils/custom-message'
import CPF from 'cpf'
import { z } from 'zod'

export enum ReporterStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  VACATION = 'VACATION',
  PAUSED = 'PAUSED'
}

export const ReporterSchema = z.object({
  name: z.string().min(2).max(64),
  email: z.string().email(),
  phone: z.string().nullish(),
  cpf: z
    .string()
    .refine((value) => CPF.isValid(value), params({ key: 'invalid_cpf' })),
  specialty: z.string().min(2).max(64),
  status: z.nativeEnum(ReporterStatus).default(ReporterStatus.ACTIVE).nullish(),
  entryDate: z.coerce
    .date()
    .min(new Date(1970, 1, 1))
    .max(new Date()),
  departureDate: z.coerce.date().nullish()
})

export type ReporterProps = z.infer<typeof ReporterSchema>

export type ReporterForm = z.infer<typeof ReporterSchema>
export type ReporterFormWithId = ReporterForm & { id: string }
