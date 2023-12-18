import { useFetch } from '@/hooks/useFetch'
import { ThemesColumns } from '@/pages/themes/table/themes.columns'
import { backend } from '@/routes/routes'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { MagazineForm } from '../magazines.schema'

type ThemesSelectProps = {
  form: UseFormReturn<MagazineForm>
}

export const ThemesSelect = ({ form }: ThemesSelectProps) => {
  const { list } = useFetch<ThemesColumns[]>({
    baseUrl: backend.themes.baseUrl,
    query: ['themes'],
    fetch: {
      list: true
    }
  })

  if (list.isLoading) {
    return <div>Loading...</div>
  }

  return (
    <fieldset>
      <Controller
        control={form.control}
        name={'themeId'}
        render={({ field: { value, onChange, ...rest } }) => (
          <Autocomplete
            defaultItems={list.data}
            label={'Temas'}
            labelPlacement="outside"
            placeholder={'Selecione um tema'}
            errorMessage={form.formState.errors.themeId?.message}
            selectedKey={String(value)}
            onSelectionChange={(value) => onChange(String(value ?? ''))}
            {...rest}
            isRequired
          >
            {(item) => (
              <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
            )}
          </Autocomplete>
        )}
      />
      {/* <Select
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
        data-has-helper={!list.data?.length}
        isRequired
      >
        {Array.from(list.data ?? []).map((theme) => (
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
        ))}
      </Select> */}
    </fieldset>
  )
}
