import { z } from 'zod'

export const SignUpSchema = z.object({
  name: z.string().min(3).max(64),
  phone: z.string().min(11).max(11),
  email: z.string().email(),
  password: z.string().min(6).max(64),
  confirmPassword: z.string().min(6).max(64)
})

export const defaultValues: SignUp = {
  name: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: ''
}

export type SignUp = z.infer<typeof SignUpSchema>
