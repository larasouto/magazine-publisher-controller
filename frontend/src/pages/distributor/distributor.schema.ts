import { z } from 'zod'

export enum Region {
  Norte = 'Norte',
  Nordeste = 'Nordeste',
  Sul = 'Sul',
  Sudeste = 'Sudeste',
  Centro_Oeste = 'Centro-Oeste'
}

export const DistributorsSchema = z.object({
  name: z.string().min(3).max(100),
  address: z.string().max(100).nullish(),
  region: z.nativeEnum(Region).nullish()
})

export type DistributorsForm = z.infer<typeof DistributorsSchema>
export type DistributorsFormWithId = DistributorsForm & { id: string }
