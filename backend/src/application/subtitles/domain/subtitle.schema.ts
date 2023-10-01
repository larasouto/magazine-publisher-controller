import { z } from 'zod'

export enum SubtitleType {
  CONTENT = 'CONTENT SUMMARY',
  HIGHLIGHTS = 'HIGHLIGHTS',
  QUOTES = 'QUOTES',
  ADDITIONAL = 'ADDITIONAL INFORMATION',
}

export const SubtitleSchema = z.object({
  name: z.string().min(2).max(64),
  description: z.string().min(2).max(64).nullish(),
  type: z.string().min(2).max(64),
})

export type SubtitleProps = z.infer<typeof SubtitleSchema>
