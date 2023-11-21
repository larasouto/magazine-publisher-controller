import { useFetch } from '@/hooks/useFetch'
import { PhotographerColumns } from '@/pages/photographers/table/photographers.columns'
import { backend } from '@/routes/routes'
import { Select, SelectItem } from '@nextui-org/react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { ArticleData } from '../articles.schema'

type PhotographersSelectProps = {
  form: UseFormReturn<ArticleData>
}

export const PhotographersSelect = ({ form }: PhotographersSelectProps) => {
  const { list } = useFetch<PhotographerColumns[]>({
    baseUrl: backend.photographers.baseUrl,
    query: ['photographers'],
    fetch: {
      list: true
    }
  })

  return (
    <fieldset>
      <Controller
        control={form.control}
        name="photographers"
        render={({ field: { value, onChange, ...rest } }) => (
          <Select
            items={list?.data ?? []}
            label={'Fótografos'}
            placeholder={'Selecione um ou mais fótografos'}
            labelPlacement="outside"
            defaultSelectedKeys={value}
            onSelectionChange={(keys) => {
              onChange(Array.from(keys))
            }}
            isLoading={list.isLoading}
            selectionMode="multiple"
            disallowEmptySelection
            errorMessage={form.formState.errors.photographers?.message}
            isRequired
            {...rest}
          >
            {(photographer) => (
              <SelectItem key={photographer.id} textValue={photographer.name}>
                <div className="flex gap-2 items-center">
                  <div className="flex flex-col">
                    <span className="text-small">{photographer.name}</span>
                    <span className="text-tiny text-default-500">
                      {photographer.cpf}
                    </span>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
        )}
      />
    </fieldset>
  )
}
