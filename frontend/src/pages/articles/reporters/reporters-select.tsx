import { useFetch } from '@/hooks/useFetch'
import { ReporterColumns } from '@/pages/reporters/table/reporters.columns'
import { backend } from '@/routes/routes'
import { Select, SelectItem } from '@nextui-org/react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { ArticleData } from '../articles.schema'

type ReportersSelectProps = {
  form: UseFormReturn<ArticleData>
}

export const ReportersSelect = ({ form }: ReportersSelectProps) => {
  const { list } = useFetch<ReporterColumns[]>({
    baseUrl: backend.reporters.baseUrl,
    query: ['reporters'],
    fetch: {
      list: true
    }
  })

  return (
    <fieldset>
      <Controller
        control={form.control}
        name="reporters"
        render={({ field: { value, onChange, ...rest } }) => (
          <Select
            items={list?.data ?? []}
            label={'Repórteres'}
            placeholder={'Selecione um ou mais repórteres'}
            labelPlacement="outside"
            defaultSelectedKeys={value}
            onSelectionChange={(keys) => {
              onChange(Array.from(keys))
            }}
            isLoading={list.isLoading}
            selectionMode="multiple"
            disallowEmptySelection
            errorMessage={form.formState.errors.reporters?.message}
            isRequired
            {...rest}
          >
            {(reporter) => (
              <SelectItem key={reporter.id} textValue={reporter.name}>
                <div className="flex gap-2 items-center">
                  <div className="flex flex-col">
                    <span className="text-small">{reporter.name}</span>
                    <span className="text-tiny text-default-500">
                      {reporter.cpf}
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
