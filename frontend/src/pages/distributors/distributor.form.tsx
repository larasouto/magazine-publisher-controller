import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/ui/Grid'
import { useFetch } from '@/hooks/useFetch'
import { backend, routes } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { InputMask } from '@react-input/mask'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { distributorRegion } from './constant/index'
import {
  DistributorRegion,
  DistributorsForm,
  DistributorsFormWithId,
  DistributorsSchema
} from './distributor.schema'
import { SelectState } from './select/addresses.states'

type DistributorFormProps = {
  data?: DistributorsFormWithId
}

export const DistributorForm = ({ data }: DistributorFormProps) => {
  const { t } = useTranslation('Distributor')

  const { create, update } = useFetch<DistributorsForm>({
    baseUrl: backend.distributors.baseUrl,
    query: ['Distributor'],
    redirectTo: routes.distributors.index,
    fetch: {
      id: data?.id
    }
  })

  const form = useForm<DistributorsForm>({
    mode: 'all',
    resolver: zodResolver(DistributorsSchema),
    defaultValues: data
  })

  const onSubmit = async (form: DistributorsForm) => {
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
            name="name"
            render={({ field }) => (
              <Input
                label={'Nome'}
                placeholder={'Informe o nome da distribuidora'}
                errorMessage={form.formState.errors.name?.message}
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
            name="street"
            render={({ field }) => (
              <Input
                label={'Rua'}
                placeholder={'Informe o nome da rua'}
                errorMessage={form.formState.errors.street?.message}
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
            name="number"
            render={({ field }) => (
              <InputMask
                mask="_____"
                replacement={{ _: /\d/ }}
                component={Input}
                label={'Número'}
                placeholder={'Informe o número'}
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
                label={'Cidade'}
                placeholder={'Informe o nome da cidade'}
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
                label={'CEP'}
                placeholder={'Informe o CEP'}
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
                label={'Complemento'}
                placeholder={'Informe o complemento'}
                errorMessage={form.formState.errors.complement?.message}
                labelPlacement="outside"
                {...field}
                value={String(field.value ?? '')}
                onValueChange={field.onChange}
              />
            )}
          />
        </fieldset>
        <fieldset>
          <Select
            label={'Região de atuação da distribuidora'}
            placeholder={'Selecione a região de atuação'}
            labelPlacement="outside"
            defaultSelectedKeys={[String(data?.region ?? 1)]}
            {...form.register('region')}
            errorMessage={form.formState.errors.region?.message}
            disallowEmptySelection
            isRequired
          >
            {Object.values(DistributorRegion)
              .filter((value) => !isNaN(+value))
              .map((value) => (
                <SelectItem key={value} value={value}>
                  {distributorRegion[DistributorRegion[value]]}
                </SelectItem>
              ))}
          </Select>
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
