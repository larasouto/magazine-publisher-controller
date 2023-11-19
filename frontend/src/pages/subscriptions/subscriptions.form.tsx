import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/ui/Grid'
import { PriceIcon } from '@/components/ui/icons/PriceIcon'
import { useFetch } from '@/hooks/useFetch'
import { backend, routes } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { MagazinesSelect } from './magazines/magazines-select'
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
          <Input
            label={t('form.name.label')}
            placeholder={t('form.name.placeholder')}
            errorMessage={form.formState.errors.name?.message}
            labelPlacement="outside"
            {...form.register('name')}
            isRequired
          />
        </fieldset>
        <fieldset>
          <Input
            label={t('form.description.label')}
            placeholder={t('form.description.placeholder')}
            errorMessage={form.formState.errors.description?.message}
            labelPlacement="outside"
            {...form.register('description')}
          />
        </fieldset>
        <fieldset>
          <Select
            label={t('form.subscription_frequency.label')}
            placeholder={t('form.subscription_frequency.placeholder')}
            labelPlacement="outside"
            defaultSelectedKeys={[String(data?.frequency ?? 1)]}
            {...form.register('frequency')}
            errorMessage={form.formState.errors.frequency?.message}
            disallowEmptySelection
            isRequired
          >
            {Object.values(SubscriptionFrequency)
              .filter((value) => !isNaN(+value))
              .map((value) => (
                <SelectItem key={value} value={value}>
                  {t(
                    `form.subscription_frequency.options.${SubscriptionFrequency[
                      value
                    ].toLowerCase()}`
                  )}
                </SelectItem>
              ))}
          </Select>
        </fieldset>
        <fieldset>
          <Select
            label={t('form.subscription_type.label')}
            placeholder={t('form.subscription_type.placeholder')}
            labelPlacement="outside"
            defaultSelectedKeys={[String(data?.type ?? 1)]}
            {...form.register('type')}
            errorMessage={String(form.formState.errors.type?.message)}
            disallowEmptySelection
            isRequired
          >
            {Object.values(SubscriptionType)
              .filter((value) => !isNaN(+value))
              .map((value) => (
                <SelectItem key={value} value={value}>
                  {t(
                    `form.subscription_frequency.options.${SubscriptionType[
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
            startContent={<PriceIcon />}
            label={t('form.price.label')}
            placeholder={t('form.price.placeholder')}
            errorMessage={form.formState.errors.price?.message}
            labelPlacement="outside"
            {...form.register('price')}
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
