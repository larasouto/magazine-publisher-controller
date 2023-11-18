import { useFetch } from '@/hooks/useFetch'
import { GraphicsFormWithId } from '@/pages/graphics/graphics.schema'
import { backend } from '@/routes/routes'
import { Select, SelectItem } from '@nextui-org/react'
import { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { GraphocsOnDistributorForm } from '../graphicsOnDistributor.schema'

type GraphicsSelectProps = {
  form: UseFormReturn<GraphocsOnDistributorForm>
}

export const GraphicsSelect = ({ form }: GraphicsSelectProps) => {
  const { t } = useTranslation('graphics')

  const { list } = useFetch<GraphicsFormWithId[]>({
    baseUrl: backend.graphics.baseUrl,
    query: ['graphics'],
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
        {...form.register('graphicsId')}
        defaultSelectedKeys={
          form.getValues('graphicsId')
            ? [form.getValues('graphicsId')]
            : undefined
        }
        isLoading={list.isLoading}
        disallowEmptySelection
        errorMessage={form.formState.errors.graphicsId?.message}
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
