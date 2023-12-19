import { useFetch } from '@/hooks/useFetch'
import { DistributorsFormWithId } from '@/pages/distributors/distributor.schema'
import { backend } from '@/routes/routes'
import { Select, SelectItem } from '@nextui-org/react'
import { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { GraphocsOnDistributorForm } from '../graphicsOnDistributor.schema'

type DistributorSelectProps = {
  form: UseFormReturn<GraphocsOnDistributorForm>
}

export const DistributorSelect = ({ form }: DistributorSelectProps) => {
  const { t } = useTranslation('bookstores')

  const { list } = useFetch<DistributorsFormWithId[]>({
    baseUrl: backend.distributor.baseUrl,
    query: ['distributor'],
    fetch: {
      list: true
    }
  })

  return (
    <fieldset>
      <Select
        items={list?.data ?? []}
        label={t('form.name.label')}
        placeholder={t('form.name.placeholder')}
        labelPlacement="outside"
        {...form.register('distributorId')}
        defaultSelectedKeys={
          form.getValues('distributorId')
            ? [form.getValues('distributorId')]
            : undefined
        }
        isLoading={list.isLoading}
        disallowEmptySelection
        errorMessage={form.formState.errors.distributorId?.message}
        isRequired
      >
        {(edition) => (
          <SelectItem key={edition.id} textValue={edition.name}>
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <span className="text-small">{edition.name}</span>
                <span className="text-tiny text-default-500">
                  {edition.name}
                </span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
    </fieldset>
  )
}
