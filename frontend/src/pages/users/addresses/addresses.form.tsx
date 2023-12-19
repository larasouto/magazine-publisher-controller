import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/ui/Grid'
import { useFetch } from '@/hooks/useFetch'
import { backend, routes } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@nextui-org/react'
import { InputMask } from '@react-input/mask'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useTabs } from '../context/address.context'
import {
  AddressesData,
  AddressesDataWithId,
  AddressesSchema
} from './addresses.schema'
import { SelectState } from './select/addresses.states'

type AddressesFormProps = {
  data?: AddressesDataWithId
}

export const AddressesForm = ({ data }: AddressesFormProps) => {
  const { t } = useTranslation('addresses')
  const { setSelected } = useTabs()

  const form = useForm({
    mode: 'all',
    resolver: zodResolver(AddressesSchema),
    defaultValues: data
  })

  const { create, update } = useFetch<AddressesData>({
    baseUrl: backend.profile.addresses.baseUrl,
    query: ['addresses'],
    fetch: {
      id: data?.id
    },
    redirectTo: routes.profile.addresses.index
  })

  const onSubmit = async (form: AddressesDataWithId) => {
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
          <Controller
            control={form.control}
            name="street"
            render={({ field }) => (
              <Input
                type="text"
                label={t('form.street.label')}
                placeholder={t('form.street.placeholder')}
                errorMessage={form.formState.errors.street?.message}
                labelPlacement="outside"
                isRequired
                {...field}
                onValueChange={field.onChange}
              />
            )}
          />
        </fieldset>
        <fieldset>
          <Controller
            control={form.control}
            name="number"
            render={({ field }) => (
              <InputMask
                mask="_____"
                replacement={{ _: /\d/ }}
                component={Input}
                label={t('form.number.label')}
                placeholder={t('form.number.placeholder')}
                errorMessage={form.formState.errors.number?.message}
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
            name="city"
            render={({ field }) => (
              <Input
                type="text"
                label={t('form.city.label')}
                placeholder={t('form.city.placeholder')}
                errorMessage={form.formState.errors.city?.message}
                labelPlacement="outside"
                isRequired
                {...field}
                onValueChange={field.onChange}
              />
            )}
          />
        </fieldset>
        <fieldset>
          <SelectState form={form} />
        </fieldset>
        <fieldset>
          <Controller
            control={form.control}
            name="zip"
            render={({ field }) => (
              <InputMask
                mask="_____-___"
                replacement={{ _: /\d/ }}
                component={Input}
                label={t('form.zip.label')}
                placeholder={t('form.zip.placeholder')}
                errorMessage={form.formState.errors.zip?.message}
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
            name="complement"
            render={({ field }) => (
              <Input
                type="text"
                label={t('form.complement.label')}
                placeholder={t('form.complement.placeholder')}
                errorMessage={form.formState.errors.complement?.message}
                labelPlacement="outside"
                {...field}
                value={String(field.value ?? '')}
                onValueChange={field.onChange}
              />
            )}
          />
        </fieldset>
      </GridLayout>
      <SubmitButton isEdit={!!data} fnResetButton={form.reset}>
        {data ? t('common:btn.edit') : t('common:btn.save')}
      </SubmitButton>
    </form>
  )
}
