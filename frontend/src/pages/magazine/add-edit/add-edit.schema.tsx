import { z } from 'zod'

export const AddEditSchema = z.object({
  title: z.string().min(1).max(20),
  edition_number: z.string(),
  drawing: z.string().min(1).max(20),
  publication_date: z.string(),
  value: z.string(),
  caption: z.string().min(1).max(20)
})

export const defaultValues: AddEdit = {
  title: '',
  edition_number: '',
  drawing: '',
  value: '',
  caption: '',
  publication_date: ''
}

export type AddEdit = z.infer<typeof AddEditSchema>
