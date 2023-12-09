import { z } from 'zod'

export const CandidateSchema = z.object({
  pdfPath: z.string(),
  name: z.string().min(2).max(64),
  age: z.coerce.number().positive(),
  maritalStatus: z.string().min(2).max(20),
  nationality: z.string().min(2).max(20),
  email: z.string().email(),
  phone: z.number(),
  address: z.string().min(2).max(64),
  academicEducation: z.string().min(2).max(64),
  intendedSalary: z.coerce.number().nonnegative(),
  desiredJobTitle: z.string().min(2).max(64),
  companyName: z.string().min(2).max(64),
  positionHeld: z.string().min(2).max(64),
  companyContact: z.string(),
})

export type CandidateProps = z.infer<typeof CandidateSchema>
