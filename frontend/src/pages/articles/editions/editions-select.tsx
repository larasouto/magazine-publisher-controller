import { useFetch } from '@/hooks/useFetch'
import { EditionColumns } from '@/pages/editions/table/editions.columns'
import { backend } from '@/routes/routes'
import { Input } from '@nextui-org/react'
import { UseFormReturn } from 'react-hook-form'
import { ArticleData } from '../articles.schema'

type EditionsSelectProps = {
  form: UseFormReturn<ArticleData>
}

export const EditionsSelect = ({ form }: EditionsSelectProps) => {
  const { get } = useFetch<EditionColumns>({
    baseUrl: backend.editions.baseUrl,
    query: ['editions'],
    fetch: {
      id: form.getValues('editionId'),
      get: true
    }
  })

  return (
    <fieldset>
      <Input
        label={'Revista'}
        placeholder={'Selecione uma edição'}
        labelPlacement="outside"
        value={get.data?.title}
      />
    </fieldset>
  )
}
