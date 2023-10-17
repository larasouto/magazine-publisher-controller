import { useFetch } from '@/hooks/useFetch'
import { ThemesColumns } from '@/pages/themes/table/themes.columns'
import { backend } from '@/routes/routes'
import { Select, SelectItem } from '@nextui-org/react'
import { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { MagazineForm } from '../magazines.schema'

type ThemesSelectProps = {
  form: UseFormReturn<MagazineForm>
}

export const ThemesSelect = ({ form }: ThemesSelectProps) => {
  const { t } = useTranslation('magazines')

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
        label={t('form.theme.label')}
        placeholder={t('form.theme.placeholder')}
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
