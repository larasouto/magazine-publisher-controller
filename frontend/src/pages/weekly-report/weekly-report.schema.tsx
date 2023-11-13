import { Workspace } from '@/stores/useWorkspaceStore'
import { max, message, min, required } from '@/utils/replace-html-tags'
import { z } from 'zod'

export const WeeklyReportSchema = z.object({
  projectId: z
    .string()
    .uuid()
    .default(Workspace.getWorkspace()?.id ?? 'error')
    .readonly(),
  weeklyEvaluationId: z.string().refine(min, required),
  toolEvaluation: z
    .string()
    .refine((v) => max(v, 1000), message('max', 1000))
    .nullish(),
  processes: z
    .array(
      z.object({
        group: z.string().refine(min, required),
        name: z.string().refine(min, required),
        description: z
          .string()
          .refine((v) => max(v, 1000), message('max', 1000))
          .nullish(),
        filesFolder: z.string().nullish()
      })
    )
    .default([])
})

export type WeeklyReportData = z.infer<typeof WeeklyReportSchema>
export type WeeklyReportDataWithId = WeeklyReportData & { id: string }
