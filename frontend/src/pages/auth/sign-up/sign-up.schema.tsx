import { z } from 'zod'

export const SignUpSchema = z.object({
  name: z.string().min(3).max(64),
  email: z.string().email(),
  password: z.string().min(8).max(64),
  confirmPassword: z.string().min(5).max(64)
})

export type SignUp = z.infer<typeof SignUpSchema>
