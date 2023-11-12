import { z } from 'zod'

export enum AdvertisingCategory {
  BEGINNING = 0,
  MIDDLE = 1,
  END = 2,
}

export enum AdvertisingType {
  BANNER = 0,
  WHOLE_PAGE = 1,
  DOUBLE_PAGE = 2,
}

export enum AdvertisingStatus {
  PENDING = 0,
  APPROVED = 1,
  REJECTED = 2,
}

export const AdvertisingSchema = z.object({
  imagePath: z.string().url(),
  title: z.string().min(1).max(64),
  description: z.string().min(1).max(255).nullish(),
  category: z.nativeEnum(AdvertisingCategory),
  type: z.nativeEnum(AdvertisingType),
  status: z.nativeEnum(AdvertisingStatus),
  price: z.coerce.number().nonnegative(),
  magazineId: z.string().uuid(),
  userId: z.string().uuid(),
})

export type AdvertisingProps = z.infer<typeof AdvertisingSchema>
