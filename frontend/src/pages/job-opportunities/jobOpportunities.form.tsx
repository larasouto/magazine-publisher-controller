import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/ui/Grid'
import { PriceIcon } from '@/components/ui/icons/PriceIcon'
import { useFetch } from '@/hooks/useFetch'
import { backend } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { JobOpportunityForm, JobOpportunityFormWithId, JobOpportunitySchema } from './jobOpportunities.schema'

type JobOpportunitiesFormProps = {
  data?: JobOpportunityFormWithId
}

export const JobOpportunitiesForm = ({ data }: JobOpportunitiesFormProps) => {
  const { t } = useTranslation('jobOpportunities')

  const { create, update } = useFetch<JobOpportunityForm>({
    baseUrl: backend.jobOpportunities.baseUrl,
    query: ['jobOpportunities'],
    fetch: {
      id: data?.id
    }
  })

  const form = useForm<JobOpportunityForm>({
    mode: 'all',
    resolver: zodResolver(JobOpportunitySchema),
    defaultValues: data
  })

  const onSubmit = async (form: JobOpportunityForm) => {
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
            label={'Cargo'}
            placeholder={'Informe o cargo'}
            errorMessage={form.formState.errors.office?.message}
            labelPlacement="outside"
            {...form.register('office')}
            isRequired
          />
        </fieldset>
        <fieldset>
          <Input
            type="requirements"
            label={'Requisitos da vaga'}
            placeholder={'Informe os requisitos da vaga'}
            errorMessage={form.formState.errors.requirements?.message}
            labelPlacement="outside"
            {...form.register('requirements')}
            isRequired
          />
        </fieldset>
        <fieldset>
            <Input
              type="hours"
              label={'Carga horária'}
              placeholder={'Informe a carga horária'}
              errorMessage={form.formState.errors.hours?.message}
              labelPlacement="outside"
              {...form.register('hours')}
              isRequired
            />
          </fieldset>
          <fieldset>
          <Input
            type="wage"
            startContent={<PriceIcon />}
            label={'Faixa salarial'}
            placeholder={'Informe a faixa salarial'}
            errorMessage={form.formState.errors.wage?.message}
            labelPlacement="outside"
            {...form.register('wage')}
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
