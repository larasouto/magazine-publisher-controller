import { z } from 'zod'
import { User } from './user'
import { Address } from '@/application/addresses/domain/address'
import { Card } from '@/application/cards/domain/card'
import { Subscription } from '@/application/subscriptions/admin/domain/subscription'

export enum UserRole {
  CUSTOMER = 0,
  ADMIN = 1,
}

export const UserSchema = z.object({
  name: z.string().min(3).max(64),
  email: z.string().email(),
  password: z.string().min(8).max(64),
  phone: z.string().max(20).nullish(),
  role: z.nativeEnum(UserRole).default(UserRole.CUSTOMER),
})

export type UserProps = z.infer<typeof UserSchema>
