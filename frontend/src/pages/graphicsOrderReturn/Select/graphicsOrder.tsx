import { useFetch } from '@/hooks/useFetch'
import { GraphicsOrdersFormWithId } from '@/pages/graphicsOrders/graphicsOrders.schema'
import { backend } from '@/routes/routes'
import { Select, SelectItem } from '@nextui-org/react'
import { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { GraphicsOrdersReturnForm } from '../graphicsOrderReturn.schema'

type GraphicsOrderSelectProps = {
  form: UseFormReturn<GraphicsOrdersReturnForm>
}

export const GraphicsOrderSelect = ({ form }: GraphicsOrderSelectProps) => {
  const { t } = useTranslation('graphicsOrder')

  const { list } = useFetch<GraphicsOrdersFormWithId[]>({
    baseUrl: backend.graphicsOrder.baseUrl,
    query: ['graphicsOrder'],
    fetch: {
      list: true
    }
  })

  return (
    <fieldset>
      <Select
        items={list?.data ?? []}
        label={t('form.graphicsOrder.label')}
        placeholder={t('form.graphicsOrder.placeholder')}
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
        {(graphicsOrder) => (
          <SelectItem key={graphicsOrder.id} textValue={graphicsOrder.id}>
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <span className="text-small">{graphicsOrder.id}</span>
                <span className="text-tiny text-default-500">
                  {graphicsOrder.id} 
                </span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
    </fieldset>
  )
}
