import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/ui/Grid'
import { DatePicker } from '@/components/ui/date-picker/DatePicker'
import { useFetch } from '@/hooks/useFetch'
import { backend, routes } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BookstoreSelect } from './bookstore/bookstore-select'
import {
  BookstoreOrderForm,
  BookstoreOrdersFormWithId,
  BookstoreOrdersSchema,
  Status
} from './bookstoreOrder.schema'
import { EditionsSelect } from './editions/editions-select'
import { GraphocsOnDistributorSelect } from './graphicsOnDistributor/graphicsOnDistributor'

type BookstoreOrdersFormProps = {
  data?: BookstoreOrdersFormWithId
}

export const BookstoreOrdersForm = ({ data }: BookstoreOrdersFormProps) => {
  const { t } = useTranslation('bookstoreOrders')

  const { create, update } = useFetch<BookstoreOrderForm>({
    baseUrl: backend.bookstoreOrders.baseUrl,
    query: ['bookstoreOrders'],
    redirectTo: routes.bookstoreOrders.index,
    fetch: {
      id: data?.id
    }
  })

 const form = useForm<BookstoreOrderForm>({
    mode: 'all',
    resolver: zodResolver(BookstoreOrdersSchema),
    defaultValues: {
      ...data,
      status: Status.onHold,
    }
  })

  const onSubmit = async (form: BookstoreOrderForm) => {
    if (data) {
      await update.mutateAsync(form)
      return
    }
    await create.mutateAsync(form)
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-3"
      noValidate
    >
      <GridLayout cols="3">
        <EditionsSelect form={form} />
        <fieldset>
            <Input
              type="number"
              label={t('form.exampleNumber.label')}
              placeholder={t('form.exampleNumber.placeholder')}
              errorMessage={form.formState.errors.exampleNumber?.message}
              labelPlacement="outside"
              {...form.register('exampleNumber')}
              isRequired
            />
          </fieldset>
        <BookstoreSelect form={form} />
        <fieldset>
          <Input
            label={t('form.deliveryAddress.label')}
            placeholder={t('form.deliveryAddress.placeholder')}
            errorMessage={form.formState.errors.deliveryAddress?.message}
            labelPlacement="outside"
            {...form.register('deliveryAddress')}
            isRequired
          />
        </fieldset>
        <GraphocsOnDistributorSelect form={form} />
        <fieldset>
          <Controller
            control={form.control}
            name="receiptDate"
            render={({ field }) => (
              <DatePicker
                field={field}
                label={t('form.receiptDate.label')}
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date <= new Date()}
                initialFocus
                isRequired
              />
            )}
          />
        </fieldset>
      </GridLayout>
      <SubmitButton
        isEdit={!!data}
        fnResetButton={form.reset}
        isLoading={create.isLoading || update.isLoading}
      >
        {data ? t('common:btn.edit') : t('common:btn.save')}
      </SubmitButton>
    </form>
  )
}
