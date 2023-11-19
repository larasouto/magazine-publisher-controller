import { useFetch } from '@/hooks/useFetch'
import { backend } from '@/routes/routes'
import { Select, SelectItem } from '@nextui-org/react'
import { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BookstoreOrdersFormWithId } from '../../bookstoreOrder/bookstoreOrder.schema'
import { BookstoreOrderReturnForm } from '../bookstoreOrderReturn.schema'

type BookstoreOrderReturnsSelectProps = {
  form: UseFormReturn<BookstoreOrderReturnForm>
}

export const BookstoreOrderReturnsSelect = ({ form }: BookstoreOrderReturnsSelectProps) => {
  const { t } = useTranslation('bookstoreOrderReturn')

  const { list } = useFetch<BookstoreOrdersFormWithId[]>({
    baseUrl: backend.bookstoreOrderReturn.baseUrl,
    query: ['bookstoreOrderReturn'],
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
        {(bookstoreOrderReturn) => (
          <SelectItem key={bookstoreOrderReturn.id} textValue={bookstoreOrderReturn.id}>
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <span className="text-small">{bookstoreOrderReturn.id}</span>
                <span className="text-tiny text-default-500">
                  {bookstoreOrderReturn.id}
                </span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
    </fieldset>
  )
}
