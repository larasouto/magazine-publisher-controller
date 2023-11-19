import { useFetch } from '@/hooks/useFetch'
import { GraphicsOrdersFormWithId } from '@/pages/graphicsOrder/graphicsOrder.schema'
import { backend } from '@/routes/routes'
import { Select, SelectItem } from '@nextui-org/react'
import { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { GraphicsOrdersReturnForm } from '../graphicsOrderReturn.schema'

type GraphhicsOrderIdProps = {
  form: UseFormReturn<GraphicsOrdersReturnForm>
}

export const GraphhicsOrderId = ({ form }: GraphhicsOrderIdProps) => {
  const { t } = useTranslation('graphicsOrders')

  const { list } = useFetch<GraphicsOrdersFormWithId[]>({
    baseUrl: backend.graphicsOrders.baseUrl,
    query: ['graphicsOrders'],
    fetch: {
      list: true
    }
  })

  return (
    <fieldset>
      <Select
        items={list?.data ?? []}
        label={t('form.graphicsOrderId.label')}
        placeholder={t('form.graphicsOrderId.placeholder')}
        labelPlacement="outside"
        {...form.register('graphicsOrderId')}
        defaultSelectedKeys={
          form.getValues('graphicsOrderId')
            ? [form.getValues('graphicsOrderId')]
            : undefined
        }
        isLoading={list.isLoading}
        disallowEmptySelection
        errorMessage={form.formState.errors.graphicsOrderId?.message}
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