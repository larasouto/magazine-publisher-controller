import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/ui/Grid'
import { PriceIcon } from '@/components/ui/icons/PriceIcon'
import { useFetch } from '@/hooks/useFetch'
import { backend, routes } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { MagazinesSelect } from './magazines/magazines-select'
import { subscriptionFrequency, subscriptionType } from './mappers'
import {
  SubscriptionData,
  SubscriptionDataWithId,
  SubscriptionFrequency,
  SubscriptionSchema,
  SubscriptionType
} from './subscriptions.schema'

type SubscriptionsFormProps = {
  data?: SubscriptionDataWithId
}

export const SubscriptionForm = ({ data }: SubscriptionsFormProps) => {
  const { t } = useTranslation('subscriptions')

  const { create, update } = useFetch<SubscriptionData>({
    baseUrl: backend.subscriptions.baseUrl,
    query: ['subscriptions'],
    redirectTo: routes.subscriptions.index,
    fetch: {
      id: data?.id
    }
  })

  const form = useForm<SubscriptionData>({
    mode: 'all',
    resolver: zodResolver(SubscriptionSchema),
    defaultValues: data
  })

  const onSubmit = async (form: SubscriptionData) => {
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
                placeholder={'Informe o nome da assinatura'}
                errorMessage={form.formState.errors.name?.message}
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
            name="description"
            render={({ field }) => (
              <Input
                label={'Descrição'}
                placeholder={'Informe a descrição da assinatura'}
                errorMessage={form.formState.errors.description?.message}
                labelPlacement="outside"
                {...field}
                onValueChange={field.onChange}
              />
            )}
          />
        </fieldset>
        <fieldset>
          <Controller
            control={form.control}
            name="frequency"
            render={({ field }) => (
              <Select
                label={'Período de inscrição'}
                placeholder={'Selecione o período de inscrição'}
                labelPlacement="outside"
                errorMessage={form.formState.errors.frequency?.message}
                disallowEmptySelection
                isRequired
                {...field}
                selectionMode="single"
                defaultSelectedKeys={String(field.value)}
                selectedKeys={field.value ? String(field.value) : undefined}
                onSelectionChange={field.onChange}
              >
                {Object.values(SubscriptionFrequency)
                  .filter((value) => !isNaN(+value))
                  .map((value) => (
                    <SelectItem key={value} value={value}>
                      {subscriptionFrequency[SubscriptionFrequency[value]]}
                    </SelectItem>
                  ))}
              </Select>
            )}
          />
        </fieldset>
        <fieldset>
          <Controller
            control={form.control}
            name="type"
            render={({ field }) => (
              <Select
                label={'Tipo de inscrição'}
                placeholder={'Selecione o tipo de inscrição'}
                labelPlacement="outside"
                errorMessage={form.formState.errors.type?.message}
                isRequired
                {...field}
                selectionMode="single"
                defaultSelectedKeys={String(field.value) ?? 1}
                selectedKeys={field.value ? String(field.value) : undefined}
                onSelectionChange={field.onChange}
              >
                {Object.values(SubscriptionType)
                  .filter((value) => !isNaN(+value))
                  .map((value) => (
                    <SelectItem key={value} value={value}>
                      {subscriptionType[SubscriptionType[value]]}
                    </SelectItem>
                  ))}
              </Select>
            )}
          />
        </fieldset>
        <fieldset>
          <Controller
            control={form.control}
            name="price"
            render={({ field }) => (
              <Input
                type="number"
                startContent={<PriceIcon />}
                label={'Preço'}
                placeholder={'Informe o preço da assinatura'}
                errorMessage={form.formState.errors.price?.message}
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
