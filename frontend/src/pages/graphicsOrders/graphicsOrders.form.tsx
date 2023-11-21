import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/ui/Grid'
import { useFetch } from '@/hooks/useFetch'
import { backend, routes } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  GraphicsOrderForm,
  GraphicsOrdersFormWithId,
  GraphicsOrdersSchema,
  Status
} from './graphicsOrders.schema'
import { GraphocsOnDistributorSelect } from './select/graphicsOnDistributor'
import { DatePicker } from '@/components/ui/date-picker/DatePicker'
import { BookstoreSelect } from './select/bookstores'
import { EditionsSelect } from './select/editions'
;('./graphicsOrders.schema')

type GraphicsOrdersFormProps = {
  data?: GraphicsOrdersFormWithId
}

export const GraphicsOrdersForm = ({ data }: GraphicsOrdersFormProps) => {
  const { t } = useTranslation('graphicsOrders')

  const { create, update } = useFetch<GraphicsOrderForm>({
    baseUrl: backend.graphicsOrders.baseUrl,
    query: ['graphicsOrders'],
    redirectTo: routes.graphicsOrders.index,
    fetch: {
      id: data?.id
    }
  })

  const form = useForm<GraphicsOrderForm>({
    mode: 'all',
    resolver: zodResolver(GraphicsOrdersSchema),
    defaultValues: {
      ...data,
      status: Status.onHold,
      price: 0,
      receiptDate: null,
    }
  })

  const onSubmit = async (form: GraphicsOrderForm) => {
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
            {...form.register('exampleNumber', { valueAsNumber: true })}
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
            name="departureDate"
            render={({ field }) => (
              <DatePicker
                field={field}
                label={t('form.departureDate.label')}
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
