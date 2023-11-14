import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/ui/Grid'
import { useFetch } from '@/hooks/useFetch'
import { backend, routes } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
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
      <GridLayout cols="1">
        <fieldset>
          <Input
            label={'Preço do banner'}
            placeholder={'R$ 0,00'}
            errorMessage={form.formState.errors.bannerPrice?.message}
            labelPlacement="outside"
            {...form.register('bannerPrice')}
            isRequired
          />
        </fieldset>
        <fieldset>
          <Input
            label={'Preço da página inteira'}
            placeholder={'R$ 0,00'}
            errorMessage={form.formState.errors.wholePagePrice?.message}
            labelPlacement="outside"
            {...form.register('wholePagePrice')}
            isRequired
          />
        </fieldset>
        <fieldset>
          <Input
            label={'Preço da página dupla'}
            placeholder={'R$ 0,00'}
            errorMessage={form.formState.errors.doublePagePrice?.message}
            labelPlacement="outside"
            {...form.register('doublePagePrice')}
            isRequired
          />
        </fieldset>
        <fieldset>
          <Input
            label={'Preço começo da revista'}
            placeholder={'R$ 0,00'}
            errorMessage={form.formState.errors.beginningPrice?.message}
            labelPlacement="outside"
            {...form.register('beginningPrice')}
            isRequired
          />
        </fieldset>
        <fieldset>
          <Input
            label={'Preço meio da revista'}
            placeholder={'R$ 0,00'}
            errorMessage={form.formState.errors.middlePrice?.message}
            labelPlacement="outside"
            {...form.register('middlePrice')}
            isRequired
          />
        </fieldset>
        <fieldset>
          <Input
            label={'Preço final da revista'}
            placeholder={'R$ 0,00'}
            errorMessage={form.formState.errors.endPrice?.message}
            labelPlacement="outside"
            {...form.register('endPrice')}
            isRequired
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
