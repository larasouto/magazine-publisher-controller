import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/ui/Grid'
import { DatePicker } from '@/components/ui/date-picker/DatePicker'
import { useFetch } from '@/hooks/useFetch'
import { backend, routes } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { OfferForm, OffersFormWithId, OffersSchema } from './offers.schema'

type OffersFormProps = {
  data?: OffersFormWithId
}

export const OffersForm = ({ data }: OffersFormProps) => {
  const { t } = useTranslation('offers')

  const { create, update } = useFetch<OfferForm>({
    baseUrl: backend.offers.baseUrl,
    query: ['offers'],
    redirectTo: routes.offers.index,
    fetch: {
      id: data?.id
    }
  })

  const form = useForm<OfferForm>({
    mode: 'all',
    resolver: zodResolver(OffersSchema),
    defaultValues: data
  })

  const onSubmit = async (form: OfferForm) => {
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
        <fieldset>
          <Controller
            control={form.control}
            name="discountPercentage"
            render={({ field: { value, onChange, ...rest } }) => (
              <Input
                label={'Porcentagem do desconto'}
                placeholder={'Informe a porcentagem do desconto'}
                errorMessage={form.formState.errors.discountPercentage?.message}
                labelPlacement="outside"
                value={String(value ?? '')}
                onValueChange={onChange}
                {...rest}
                isRequired
              />
            )}
          />
        </fieldset>
        <fieldset>
        <Controller
            control={form.control}
            name="dates"
            render={({ field }) => (
              <DatePicker
                label="Período da oferta"
                mode="range"
                selected={field.value}
                onSelect={field.onChange}
                errorMessage={form.formState.errors.dates?.message}
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
