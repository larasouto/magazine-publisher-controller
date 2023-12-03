import { z } from 'zod'

export const CandidateJobOpportunitySchema = z.object({
 candidateId: z.string().uuid(),
 jobOpportunityId: z.string().uuid(),
})

export type CandidateJobOpportunityProps = z.infer<typeof CandidateJobOpportunitySchema>
