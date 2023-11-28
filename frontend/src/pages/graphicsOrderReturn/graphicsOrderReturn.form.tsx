import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/ui/Grid'
import { DatePicker } from '@/components/ui/date-picker/DatePicker'
import { useFetch } from '@/hooks/useFetch'
import { backend, routes } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { GraphicsOrdersReturnForm, GraphicsOrdersReturnsFormWithId, GraphicsOrdersReturnsSchema } from './graphicsOrderReturn.schema'
import { GraphicsOrderSelect } from './Select/graphicsOrder'

type GraphicsOrdersReturnsReturnFormProps = {
  data?: GraphicsOrdersReturnsFormWithId
}

export const GraphicsOrdersReturnsForm = ({ data }: GraphicsOrdersReturnsReturnFormProps) => {
  const { t } = useTranslation('graphicsOrderReturn')

  const { create, update } = useFetch<GraphicsOrdersReturnForm>({
    baseUrl: backend.graphicsOrderReturn.baseUrl,
    query: ['graphicsOrderReturn'],
    redirectTo: routes.graphicsOrderReturn.index,
    fetch: {
      id: data?.id
    }
  })

  const form = useForm<GraphicsOrdersReturnForm>({
    mode: 'all',
    resolver: zodResolver(GraphicsOrdersReturnsSchema),
    defaultValues: data
  })

  const onSubmit = async (form: GraphicsOrdersReturnForm) => {
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
      <GridLayout cols="2">
      <GraphicsOrderSelect form={form} />
      <fieldset>
          <Input
            type="number"
            label={t('Numero de exemplares')}
            placeholder={t('informe o numero de exemplares')}
            errorMessage={form.formState.errors.returnNumber?.message}
            labelPlacement="outside"
            {...form.register('returnNumber', { valueAsNumber: true })}
            isRequired
          />
        </fieldset>
        <fieldset>
          <Controller
            control={form.control}
            name="returnDate"
            render={({ field }) => (
              <DatePicker
                field={field}
                label={t('Data de retorno')}
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