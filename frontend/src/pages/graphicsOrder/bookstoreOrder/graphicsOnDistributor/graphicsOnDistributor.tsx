import { useFetch } from '@/hooks/useFetch'
import { GraphocsOnDistributorsFormWithId } from '@/pages/graphicsOnDistributor/graphicsOnDistributor.schema'
import { backend } from '@/routes/routes'
import { Select, SelectItem } from '@nextui-org/react'
import { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BookstoreOrderForm } from '../bookstoreOrder.schema'

type GraphocsOnDistributorSelectProps = {
  form: UseFormReturn<BookstoreOrderForm>
}

export const GraphocsOnDistributorSelect = ({ form }: GraphocsOnDistributorSelectProps) => {
  const { t } = useTranslation('graphicsOnDistributor')

  const { list } = useFetch<GraphocsOnDistributorsFormWithId[]>({
    baseUrl: backend.graphicsOnDistributor.baseUrl,
    query: ['graphicsOnDistributor'],
    fetch: {
      list: true
    }
  })

  return (
    <fieldset>
      <Select
        items={list?.data ?? []}
        label={t('form.graphicsDistributorId.label')}
        placeholder={t('form.graphicsDistributorId.placeholder')}
        labelPlacement="outside"
        {...form.register('graphicsDistributorId')}
        defaultSelectedKeys={
          form.getValues('graphicsDistributorId')
            ? [form.getValues('graphicsDistributorId')]
            : undefined
        }
        isLoading={list.isLoading}
        disallowEmptySelection
        errorMessage={form.formState.errors.graphicsDistributorId?.message}
        isRequired
      >
        {(edition) => (
          <SelectItem key={edition.id} textValue={edition.id}>
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <span className="text-small">{edition.id}</span>
                <span className="text-tiny text-default-500">
                  {edition.id}
                </span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
    </fieldset>
  )
}
