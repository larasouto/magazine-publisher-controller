import { z } from 'zod'

export const UserSchema = z.object({
  name: z.string().min(3).max(64),
  email: z.string().email(),
  password: z.string().min(8).max(64),
  phone: z.string().min(3).max(255).optional(),
})

export type UserProps = z.infer<typeof UserSchema>
