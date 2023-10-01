import { ZodError } from 'zod'

export type ZodValidate<T> = {
  success: boolean
  error: ZodError<T>
  data: T
}
