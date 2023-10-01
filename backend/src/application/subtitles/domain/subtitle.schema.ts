import { z } from 'zod'

export enum SubtitleType {
  CONTENT = 'CONTENT_SUMMARY',
  HIGHLIGHTS = 'HIGHLIGHTS',
  QUOTES = 'QUOTES',
  ADDITIONAL = 'ADDITIONAL_INFORMATION',
}

export const SubtitleSchema = z.object({
  name: z.string().min(2).max(64),
  description: z.string().max(64).nullish(),
  type: z.nativeEnum(SubtitleType).default(SubtitleType.CONTENT),
})

export type SubtitleProps = z.infer<typeof SubtitleSchema>
