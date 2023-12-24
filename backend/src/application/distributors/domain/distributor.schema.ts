import { Zip } from '@/core/domain/zip'
import { z } from 'zod'

export enum DistributorRegion {
  SOUTH = 0,
  SOUTHEAST = 1,
  CENTRALWEST = 2,
  NORTHEAST = 3,
  NORTH = 4,
}
export const DistributorSchema = z.object({
  name: z.string().min(2).max(64),
  street: z.string().min(2).max(64),
  number: z.coerce.number().min(1).max(99999),
  city: z.string().min(1).max(64),
  state: z.string().min(1).max(64),
  zip: z.string().refine((value) => Zip.validate(value), {
    message: 'Código postal inválido',
  }),
  complement: z.string().max(64).nullish(),
  region: z.nativeEnum(DistributorRegion),
})

export type DsitributorProps = z.infer<typeof DistributorSchema>
