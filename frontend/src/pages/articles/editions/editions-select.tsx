import { useFetch } from '@/hooks/useFetch'
import { EditionColumns } from '@/pages/editions/table/editions.columns'
import { backend } from '@/routes/routes'
import { Select, SelectItem } from '@nextui-org/react'
import { UseFormReturn } from 'react-hook-form'
import { ArticleData } from '../articles.schema'

type EditionsSelectProps = {
  form: UseFormReturn<ArticleData>
}

export const EditionsSelect = ({ form }: EditionsSelectProps) => {
  const { list } = useFetch<EditionColumns[]>({
    baseUrl: backend.editions.baseUrl,
    query: ['editions'],
    fetch: {
      list: true
    }
  })

  return (
    <fieldset>
      <Select
        items={list?.data ?? []}
        label={'Edição'}
        placeholder={'Selecione um edição'}
        labelPlacement="outside"
        {...form.register('editionId')}
        defaultSelectedKeys={
          form.getValues('editionId')
            ? [form.getValues('editionId')]
            : undefined
        }
        isLoading={list.isLoading}
        disallowEmptySelection
        errorMessage={form.formState.errors.editionId?.message}
        isRequired
      >
        {(edition) => (
          <SelectItem key={edition.id} textValue={edition.title}>
            <div className="flex gap-2 items-center">x
              <div className="flex flex-col">
                <span className="text-small">{edition.title}</span>
                <span className="text-tiny text-default-500">
                  {edition.description}
                </span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
    </fieldset>
  )
}
