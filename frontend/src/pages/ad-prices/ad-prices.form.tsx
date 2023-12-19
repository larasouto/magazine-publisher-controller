import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/ui/Grid'
import { useFetch } from '@/hooks/useFetch'
import { backend, routes } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  AdPriceForm,
  AdPricesFormWithId,
  AdPricesSchema
} from './ad-prices.schema'
import { MagazinesSelect } from './magazines/magazines-select'

type AdPricesFormProps = {
  data?: AdPricesFormWithId
}

export const AdPricesForm = ({ data }: AdPricesFormProps) => {
  const { t } = useTranslation('adPrices')

  const { create, update } = useFetch<AdPriceForm>({
    baseUrl: backend.adPrices.baseUrl,
    query: ['ad-prices'],
    redirectTo: routes.adPrices.index,
    fetch: {
      id: data?.id
    }
  })

  const form = useForm<AdPriceForm>({
    mode: 'all',
    resolver: zodResolver(AdPricesSchema),
    defaultValues: data
  })

  const onSubmit = async (form: AdPriceForm) => {
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
        <fieldset>
          <Controller
            control={form.control}
            name="bannerPrice"
            render={({ field }) => (
              <Input
                label={'Preço do banner'}
                placeholder={'R$ 0,00'}
                errorMessage={form.formState.errors.bannerPrice?.message}
                labelPlacement="outside"
                isRequired
                {...field}
                value={String(field.value ?? '')}
                onValueChange={field.onChange}
              />
            )}
          />
        </fieldset>
        <fieldset>
          <Controller
            control={form.control}
            name="wholePagePrice"
            render={({ field }) => (
              <Input
                label={'Preço da página inteira'}
                placeholder={'R$ 0,00'}
                errorMessage={form.formState.errors.wholePagePrice?.message}
                labelPlacement="outside"
                isRequired
                {...field}
                value={String(field.value ?? '')}
                onValueChange={field.onChange}
              />
            )}
          />
        </fieldset>
        <fieldset>
          <Controller
            control={form.control}
            name="doublePagePrice"
            render={({ field }) => (
              <Input
                label={'Preço da página dupla'}
                placeholder={'R$ 0,00'}
                errorMessage={form.formState.errors.doublePagePrice?.message}
                labelPlacement="outside"
                isRequired
                {...field}
                value={String(field.value ?? '')}
                onValueChange={field.onChange}
              />
            )}
          />
        </fieldset>
        <fieldset>
          <Controller
            control={form.control}
            name="beginningPrice"
            render={({ field }) => (
              <Input
                label={'Preço começo da revista'}
                placeholder={'R$ 0,00'}
                errorMessage={form.formState.errors.beginningPrice?.message}
                labelPlacement="outside"
                isRequired
                {...field}
                value={String(field.value ?? '')}
                onValueChange={field.onChange}
              />
            )}
          />
        </fieldset>
        <fieldset>
          <Controller
            control={form.control}
            name="middlePrice"
            render={({ field }) => (
              <Input
                label={'Preço meio da revista'}
                placeholder={'R$ 0,00'}
                errorMessage={form.formState.errors.middlePrice?.message}
                labelPlacement="outside"
                isRequired
                {...field}
                value={String(field.value ?? '')}
                onValueChange={field.onChange}
              />
            )}
          />
        </fieldset>
        <fieldset>
          <Controller
            control={form.control}
            name="endPrice"
            render={({ field }) => (
              <Input
                label={'Preço final da revista'}
                placeholder={'R$ 0,00'}
                errorMessage={form.formState.errors.endPrice?.message}
                labelPlacement="outside"
                isRequired
                {...field}
                value={String(field.value ?? '')}
                onValueChange={field.onChange}
              />
            )}
          />
        </fieldset>
        <MagazinesSelect form={form} />
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
