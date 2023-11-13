import { z } from 'zod'

export const JobOpportunittySchema = z.object({
  office: z.string().min(2).max(64),
  requirements: z.string().min(2).max(64),
  hours: z.coerce.number().positive(),
  wage: z.coerce.number().nonnegative(),
  name: z.string().min(2).max(64),
  age: z.coerce.number().positive(),
  maritalStatus: z.string().min(2).max(20),
  nationality: z.string().min(2).max(20),
  email: z.string().email(),
  phone: z.string().nullish(),
  address: z.string().min(2).max(64),
  academicEducation: z.string().min(2).max(64),
  intendedSalary: z.coerce.number().nonnegative(),
  desiredJobTitle: z.string().min(2).max(64),
  companyName: z.string().min(2).max(64),
  positionHeld: z.string().min(2).max(64),
  companyContact: z.string().nullish(),
})

export type JobOpportunittyProps = z.infer<typeof JobOpportunittySchema>
