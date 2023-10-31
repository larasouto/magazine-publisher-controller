import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/ui/Grid'
import { useFetch } from '@/hooks/useFetch'
import { backend, routes } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { InputMask } from '@react-input/mask'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { CardData, CardDataWithId, CardSchema, CardType } from './cards.schema'
import { useAddress } from './context/address.context'

type CardsFormProps = {
  data?: CardDataWithId
}

export const CardsForm = ({ data }: CardsFormProps) => {
  const { t } = useTranslation('Cards')
  const { setSelected } = useAddress()

  const form = useForm({
    mode: 'all',
    resolver: zodResolver(CardSchema),
    defaultValues: data
  })

  const { create, update } = useFetch<CardData>({
    baseUrl: backend.profile.cards.baseUrl,
    query: ['cards'],
    fetch: {
      id: data?.id
    },
    redirectTo: routes.profile.cards.index
  })

  const onSubmit = async (form: CardDataWithId) => {
    if (data) {
      await update.mutateAsync(form)
      setSelected('list')
      return
    }
    await create.mutateAsync(form)
    setSelected('list')
  }

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
    >
      <GridLayout cols="2">
        <fieldset>
          <Input
            type="text"
            label={t('form.holder.label')}
            placeholder={t('form.holder.placeholder')}
            errorMessage={form.formState.errors.holder?.message}
            labelPlacement="outside"
            {...form.register('holder')}
            isRequired
          />
        </fieldset>
        <fieldset>
          <InputMask
            mask="____ ____ ____ ____"
            replacement={{ _: /\d/ }}
            component={Input}
            label={t('form.number.label')}
            placeholder={t('form.number.placeholder')}
            errorMessage={form.formState.errors.number?.message}
            labelPlacement="outside"
            {...form.register('number')}
          />
        </fieldset>
        <fieldset>
          <InputMask
            mask="__/____"
            replacement={{ _: /\d/ }}
            component={Input}
            label={t('form.expiration_date.label')}
            placeholder={t('form.expiration_date.placeholder')}
            errorMessage={form.formState.errors.expirationDate?.message}
            labelPlacement="outside"
            {...form.register('expirationDate')}
          />
        </fieldset>
        <fieldset>
          <InputMask
            mask="___"
            replacement={{ _: /\d/ }}
            component={Input}
            label={t('form.security_code.label')}
            placeholder={t('form.security_code.placeholder')}
            errorMessage={form.formState.errors.securityCode?.message}
            labelPlacement="outside"
            {...form.register('securityCode')}
          />
        </fieldset>
        <fieldset>
          <Input
            type="text"
            label={t('form.billing_address.label')}
            placeholder={t('form.billing_address.placeholder')}
            errorMessage={form.formState.errors.billingAddress?.message}
            labelPlacement="outside"
            {...form.register('billingAddress')}
            isRequired
          />
        </fieldset>
        <fieldset>
          <InputMask
            mask="(__) _.____-____"
            replacement={{ _: /\d/ }}
            component={Input}
            label={t('form.phone.label')}
            placeholder={t('form.phone.placeholder')}
            errorMessage={form.formState.errors.phone?.message}
            labelPlacement="outside"
            {...form.register('phone')}
          />
        </fieldset>
        <fieldset>
          <Select
            label={t('form.payment_method.label')}
            placeholder={t('form.payment_method.placeholder')}
            labelPlacement="outside"
            defaultSelectedKeys={[String(data?.type ?? 1)]}
            {...form.register('type')}
            errorMessage={form.formState.errors.type?.message}
            disallowEmptySelection
            isRequired
          >
            {Object.values(CardType)
              .filter((value) => !isNaN(+value))
              .map((value) => (
                <SelectItem key={value} value={value}>
                  {t(
                    `form.payment_method.options.${CardType[
                      value
                    ].toLowerCase()}`
                  )}
                </SelectItem>
              ))}
          </Select>
        </fieldset>
        <fieldset>
          <Input
            type="text"
            label={t('form.flag.label')}
            placeholder={t('form.flag.placeholder')}
            errorMessage={form.formState.errors.flag?.message}
            labelPlacement="outside"
            {...form.register('flag')}
            isRequired
          />
        </fieldset>
      </GridLayout>
      <SubmitButton isEdit={!!data} fnResetButton={form.reset}>
        {data ? t('common:btn.edit') : t('common:btn.save')}
      </SubmitButton>
    </form>
  )
}
