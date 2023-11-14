import { z } from 'zod'

export enum AdvertisingCategory {
  BEGINNING = 0,
  MIDDLE = 1,
  END = 2
}

export enum AdvertisingType {
  BANNER = 0,
  WHOLE_PAGE = 1,
  DOUBLE_PAGE = 2
}

export enum AdvertisingStatus {
  PENDING = 0,
  APPROVED = 1,
  REJECTED = 2
}

export const AdvertisingSchema = z.object({
  imagePath: z.string(),
  title: z.string().min(1).max(64),
  description: z.string().min(1).max(255).nullish(),
  category: z.coerce.number().int(),
  type: z.coerce.number().int(),
  status: z.coerce.number().int().default(AdvertisingStatus.PENDING),
  price: z.coerce.number().nonnegative(),
  magazineId: z.string().uuid()
})

export type AdvertisingData = z.infer<typeof AdvertisingSchema>
export type AdvertisingDataWithId = AdvertisingData & { id: string }
