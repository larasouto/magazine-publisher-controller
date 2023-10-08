import { useTheme } from '@/hooks/useTheme'
import { ThemesFormWithId } from '@/pages/themes/themes.schema'
import { Select, SelectItem } from '@nextui-org/react'
import { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { MagazineForm } from '../magazines.schema'

type ThemesSelectProps = {
  form: UseFormReturn<MagazineForm>
}

export const ThemesSelect = ({ form }: ThemesSelectProps) => {
  const { t } = useTranslation('magazines')
  const { list } = useTheme()

  const { data, isLoading } = useQuery<{ dto: ThemesFormWithId[] }>(
    ['themes'],
    list
  )

  return (
    <fieldset>
      <Select
        items={data?.dto ?? []}
        label={t('form.theme.label')}
        placeholder={t('form.theme.placeholder')}
        labelPlacement="outside"
        {...form.register('themeId')}
        defaultSelectedKeys={
          form.getValues('themeId') ? [form.getValues('themeId')] : undefined
        }
        isLoading={isLoading}
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
