import { z } from 'zod'

export const ThemeSchema = z.object({
  name: z.string().min(2).max(64),
  description: z.string().min(2).max(64).nullish(),
})

export type ThemeProps = z.infer<typeof ThemeSchema>
