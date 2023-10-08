import { useMagazine } from '@/hooks/useMagazine'
import { MagazineFormWithId } from '@/pages/magazines/magazines.schema'
import { Select, SelectItem } from '@nextui-org/react'
import { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { EditionForm } from '../editions.schema'

type ThemesSelectProps = {
  form: UseFormReturn<EditionForm>
}

export const MagazinesSelect = ({ form }: ThemesSelectProps) => {
  const { t } = useTranslation('magazines')
  const { list } = useMagazine()

  const { data, isLoading } = useQuery<{ dto: MagazineFormWithId[] }>(
    ['magazines'],
    list
  )

  return (
    <fieldset>
      <Select
        items={data?.dto ?? []}
        label={t('form.magazine.label')}
        placeholder={t('form.magazine.placeholder')}
        labelPlacement="outside"
        {...form.register('magazineId')}
        defaultSelectedKeys={
          form.getValues('magazineId')
            ? [form.getValues('magazineId')]
            : undefined
        }
        isLoading={isLoading}
        disallowEmptySelection
        errorMessage={form.formState.errors.magazineId?.message}
        isRequired
      >
        {(magazine) => (
          <SelectItem key={magazine.id} textValue={magazine.name}>
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <span className="text-small">{magazine.name}</span>
                <span className="text-tiny text-default-500">
                  {magazine.description}
                </span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
    </fieldset>
  )
}
