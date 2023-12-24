import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/ui/Grid'
import { DatePicker } from '@/components/ui/date-picker/DatePicker'
import { useFetch } from '@/hooks/useFetch'
import { backend, routes } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { CouponForm, CouponType, CouponsFormWithId, CouponsSchema } from './coupons.schema'

type CouponsFormProps = {
  data?: CouponsFormWithId
}

export const CouponsForm = ({ data }: CouponsFormProps) => {
  const { t } = useTranslation('coupons')

  const { create, update } = useFetch<CouponForm>({
    baseUrl: backend.coupons.baseUrl,
    query: ['coupons'],
    redirectTo: routes.coupons.index,
    fetch: {
      id: data?.id
    }
  })

  const form = useForm<CouponForm>({
    mode: 'all',
    resolver: zodResolver(CouponsSchema),
    defaultValues: data
  })

  const onSubmit = async (form: CouponForm) => {
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
          <Controller
            control={form.control}
            name="couponCode"
            render={({ field: { value, onChange, ...rest } }) => (
              <Input
                label={'Código do cupom'}
                placeholder={'Informe o código do cupom'}
                errorMessage={form.formState.errors.couponCode?.message}
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
            name="discountAmount"
            render={({ field: { value, onChange, ...rest } }) => (
              <Input
                label={'Desconto'}
                placeholder={'Informe o desconto'}
                errorMessage={form.formState.errors.discountAmount?.message}
                labelPlacement="outside"
                value={String(value ?? '')}
                onValueChange={onChange}
                {...rest}
              />
            )}
          />
        </fieldset>
        <fieldset>
          <Select
            label={'Tipo de desconto'}
            placeholder={'Selecione o tipo de desconto'}
            labelPlacement="outside"
            defaultSelectedKeys={[data?.type ?? 'PERCENTAGE']}
            {...form.register('type')}
            disallowEmptySelection
            isRequired
          >
            {Object.keys(CouponType).map((key) => (
              <SelectItem key={key} value={key}>
                {t(`form.status.options.${key.toLowerCase()}`)}
              </SelectItem>
            ))}
          </Select>
        </fieldset>
        <fieldset>
          <Controller
            control={form.control}
            name="expirationDate"
            render={({ field }) => (
              <DatePicker
                label={'Data de expiração'}
                errorMessage={form.formState.errors.expirationDate?.message}
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
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
