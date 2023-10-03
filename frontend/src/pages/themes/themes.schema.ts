import { z } from 'zod'

export const ThemesSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().max(100).nullish()
})

export type ThemeForm = z.infer<typeof ThemesSchema>
export type ThemesFormWithId = ThemeForm & { id: string }
