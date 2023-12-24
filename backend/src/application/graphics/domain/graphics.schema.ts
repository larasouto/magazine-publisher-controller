import { Zip } from '@/core/domain/zip'
import { z } from 'zod'

export const GraphicSchema = z.object({
  name: z.string().min(2).max(64),
  street: z.string().min(2).max(64),
  number: z.coerce.number().min(1).max(99999),
  city: z.string().min(1).max(64),
  state: z.string().min(1).max(64),
  zip: z.string().refine((value) => Zip.validate(value), {
    message: 'Código postal inválido',
  }),
  complement: z.string().max(64).nullish(),
})

export type GraphicProps = z.infer<typeof GraphicSchema>
