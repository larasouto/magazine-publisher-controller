import { useFetch } from '@/hooks/useFetch'
import { ThemesColumns } from '@/pages/themes/table/themes.columns'
import { backend } from '@/routes/routes'
import { Select, SelectItem } from '@nextui-org/react'
import { UseFormReturn } from 'react-hook-form'
import { ArticleData } from '../articles.schema'

type ThemesSelectProps = {
  form: UseFormReturn<ArticleData>
}

export const ThemesSelect = ({ form }: ThemesSelectProps) => {
  const { list } = useFetch<ThemesColumns[]>({
    baseUrl: backend.themes.baseUrl,
    query: ['themes'],
    fetch: {
      list: true
    }
  })

  return (
    <fieldset>
      <Select
        items={list?.data ?? []}
        label={'Tema'}
        placeholder={'Selecione um tema'}
        labelPlacement="outside"
        {...form.register('themeId')}
        defaultSelectedKeys={
          form.getValues('themeId') ? [form.getValues('themeId')] : undefined
        }
        isLoading={list.isLoading}
        disallowEmptySelection
        errorMessage={form.formState.errors.themeId?.message}
        isRequired
      >
        {(theme) => (
          <SelectItem key={theme.id} textValue={theme.name}>
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <span className="text-small">{theme.name}</span>
                <span className="text-tiny text-default-500">
                  {theme.description}
                </span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
    </fieldset>
  )
}
