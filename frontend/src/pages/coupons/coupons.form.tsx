import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/ui/Grid'
import { PriceIcon } from '@/components/ui/icons/PriceIcon'
import { useFetch } from '@/hooks/useFetch'
import { backend } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  CouponData,
  CouponDataWithId,
  CouponSchema,
  CouponType
} from './coupons.schema'

type CouponsFormProps = {
  data?: CouponDataWithId
}

export const CouponsForm = ({ data }: CouponsFormProps) => {
  const { t } = useTranslation('Coupons')

  const { create, update } = useFetch<CouponData>({
    baseUrl: backend.coupons.baseUrl,
    query: ['coupons'],
    fetch: {
      id: data?.id
    }
  })

  const form = useForm<CouponData>({
    mode: 'all',
    resolver: zodResolver(CouponSchema),
    defaultValues: data
  })

  // TODO: Remover quando o envio de arquivos estiver pronto.
  useEffect(() => {
    form.setValue(
      'couponCode',
      `/revista${Math.floor(Math.random() * 7 + 1)}.jpg`
    )
  }, [form])

  const onSubmit = async (form: CouponData) => {
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
          <Input
            label={t('form.coupon_code.label')}
            placeholder={t('form.coupon_code.placeholder')}
            errorMessage={form.formState.errors.couponCode?.message}
            labelPlacement="outside"
            {...form.register('couponCode')}
            isRequired
            isClearable
          />
        </fieldset>
        <fieldset>
          <Input
            type="number"
            startContent={<PriceIcon />}
            label={t('form.discount_amount.label')}
            placeholder={t('form.discount_amount.placeholder')}
            errorMessage={form.formState.errors.discountAmount?.message}
            labelPlacement="outside"
            {...form.register('discountAmount')}
            isClearable
          />
        </fieldset>
        <fieldset>
          <Input
            type="date"
            startContent={<Date />}
            label={t('form.expiration_date.label')}
            placeholder={t('form.expiration_date.placeholder')}
            errorMessage={form.formState.errors.expirationDate?.message}
            labelPlacement="outside"
            {...form.register('expirationDate')}
            isRequired
            isClearable
          />
        </fieldset>
        <fieldset>
          <Select
            label={t('form.coupon_type.label')}
            placeholder={t('form.coupon_type.placeholder')}
            labelPlacement="outside"
            defaultSelectedKeys={[String(data?.type ?? 1)]}
            {...form.register('type')}
            errorMessage={String(form.formState.errors.type?.message)}
            disallowEmptySelection
            isRequired
          >
            {Object.values(CouponType)
              .filter((value) => !isNaN(+value))
              .map((value) => (
                <SelectItem key={value} value={value}>
                  {t(
                    `form.coupon_type.options.${CouponType[
                      value
                    ].toLowerCase()}`
                  )}
                </SelectItem>
              ))}
          </Select>
        </fieldset>
        <fieldset>
          <Input
            type="number"
            label={t('form.available_quantity.label')}
            placeholder={t('form.available_quantity.placeholder')}
            errorMessage={form.formState.errors.availableQuantity?.message}
            labelPlacement="outside"
            {...form.register('availableQuantity')}
            isRequired
            isClearable
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
