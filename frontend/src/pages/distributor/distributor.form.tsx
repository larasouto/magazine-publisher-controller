import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/ui/Grid'
import { useFetch } from '@/hooks/useFetch'
import { backend, routes } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { DistributorsForm, DistributorsFormWithId, DistributorsSchema } from './distributor.schema'

type DistributorFormProps = {
  data?: DistributorsFormWithId
}

export const DistributorForm = ({ data }: DistributorFormProps) => {
  const { t } = useTranslation('Distributor')

  const { create, update } = useFetch<DistributorsForm>({
    baseUrl: backend.distributor.baseUrl,
    query: ['Distributor'],
    redirectTo: routes.distributor.index,
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
      <GridLayout cols="1">
        <fieldset>
          <Input
            label={t('Nome')}
            placeholder={t('informe o nome')}
            errorMessage={form.formState.errors.name?.message}
            labelPlacement="outside"
            {...form.register('name')}
            isRequired
          />
        </fieldset>
        <fieldset>
          <Input
            label={t('Endereço')}
            placeholder={t('informe o endereço')}
            errorMessage={form.formState.errors.address?.message}
            labelPlacement="outside"
            {...form.register('address')}
            isRequired
          />
        </fieldset>
        <fieldset>
          <Input
            label={t('Região')}
            placeholder={t('informe a região')}
            errorMessage={form.formState.errors.region?.message}
            labelPlacement="outside"
            {...form.register('region')}
            isRequired
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
