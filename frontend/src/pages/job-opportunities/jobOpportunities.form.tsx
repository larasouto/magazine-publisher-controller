import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/ui/Grid'
import { DatePicker } from '@/components/ui/date-picker/DatePicker'
import { useFetch } from '@/hooks/useFetch'
import { backend } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { InputMask } from '@react-input/mask'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export const JobOpportunitiesForm = ({ data }: JobOpportunityFormProps) => {
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
            label={t('form.office.label')}
            placeholder={t('form.office.placeholder')}
            errorMessage={form.formState.errors.office?.message}
            labelPlacement="outside"
            {...form.register('office')}
            isRequired
          />
        </fieldset>
        <fieldset>
          <Input
            type="requirements"
            label={t('form.requirements.label')}
            placeholder={t('form.requirements.placeholder')}
            errorMessage={form.formState.errors.requirements?.message}
            labelPlacement="outside"
            {...form.register('requirements')}
            isRequired
          />
        </fieldset>
        <fieldset>
            <Input
              type="hours"
              label={t('form.hours.label')}
              placeholder={t('form.hours.placeholder')}
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
            label={t('form.price.label')}
            placeholder={t('form.price.placeholder')}
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
