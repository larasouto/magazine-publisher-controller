import { useFetch } from '@/hooks/useFetch'
import { MagazineFormWithId } from '@/pages/magazines/magazines.schema'
import { backend } from '@/routes/routes'
import { Select, SelectItem } from '@nextui-org/react'
import { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { CouponForm } from '../coupons.schema'


type ThemesSelectProps = {
  form: UseFormReturn<CouponForm>
}

export const MagazinesSelect = ({ form }: ThemesSelectProps) => {
  const { t } = useTranslation('coupons')

  const { list } = useFetch<MagazineFormWithId[]>({
    baseUrl: backend.magazines.baseUrl,
    query: ['magazines'],
    fetch: {
      list: true
    }
  })

  if (list.isLoading) {
    return null
  }

  return (
    <fieldset>
      <Select
        items={list?.data ?? []}
        label={t('form.magazine.label')}
        placeholder={t('form.magazine.placeholder')}
        labelPlacement="outside"
        {...form.register('magazineId')}
        defaultSelectedKeys={
          form.getValues('magazineId')
            ? [form.getValues('magazineId')]
            : undefined
        }
        isLoading={list.isLoading}
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
