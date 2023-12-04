import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/ui/Grid'
import { useFetch } from '@/hooks/useFetch'
import { backend, routes } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  CandidateData,
  CandidateDataWithId,
  CandidateSchema
} from './candidates.schema'
import { JobOpportunitiesSelect } from './job-opportunities/jobOpportunities-select'
import { CandidatesPdf } from './pdf/candidates.pdfs'
import { PriceIcon } from '@/components/ui/icons/PriceIcon'


type CandidatesFormProps = {
  data?: CandidateDataWithId
}

export const CandidateForm = ({ data }: CandidatesFormProps) => {
  const { t } = useTranslation('candidates')

  const { create, update } = useFetch<CandidateData>({
    baseUrl: backend.candidates.baseUrl,
    query: ['candidates'],
    redirectTo: routes.candidates.index,
    fetch: {
      id: data?.id
    }
  })

  const form = useForm<CandidateData>({
    mode: 'all',
    resolver: zodResolver(CandidateSchema),
    defaultValues: data
  })

  const onSubmit = async (form: CandidateData) => {
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
        <CandidatesPdf
          form={form}
          errorMessage={form.formState.errors.pdfPath?.message}
        />
        <GridLayout cols="3">
          <fieldset>
            <Input
              label={'Nome'}
              placeholder={'Informe o seu nome completo'}
              errorMessage={form.formState.errors.name?.message}
              labelPlacement="outside"
              {...form.register('name')}
              isReadOnly
            />
          </fieldset>
          <fieldset>
            <Input
              type="number"
              label={'Idade'}
              placeholder={'Informe a sua idade'}
              errorMessage={form.formState.errors.age?.message}
              labelPlacement="outside"
              {...form.register('age')}
              isReadOnly
            />
          </fieldset>
        </GridLayout>
        <GridLayout cols="3">
          <fieldset>
            <Input
              label={'Estado civil'}
              placeholder={'Informe o seu estado civil'}
              errorMessage={form.formState.errors.maritalStatus?.message}
              labelPlacement="outside"
              {...form.register('maritalStatus')}
              isReadOnly
            />
          </fieldset>
          <GridLayout cols="3">
          <fieldset>
            <Input
              label={'Nacionalidade'}
              placeholder={'Informe a sua nacionalidade'}
              errorMessage={form.formState.errors.nationality?.message}
              labelPlacement="outside"
              {...form.register('nationality')}
              isReadOnly
            />
          </fieldset>
          <GridLayout cols="3">
          <fieldset>
            <Input
              label={'Email'}
              placeholder={'Informe o seu email'}
              errorMessage={form.formState.errors.email?.message}
              labelPlacement="outside"
              {...form.register('email')}
              isReadOnly
            />
          </fieldset>
          <fieldset>
            <Input
              type="number"
              label={'Telefone'}
              placeholder={'Informe seu telefone'}
              errorMessage={form.formState.errors.phone?.message}
              labelPlacement="outside"
              {...form.register('phone')}
              isReadOnly
            />
          </fieldset>
          <fieldset>
            <Input
              label={'Endereço'}
              placeholder={'Informe o seu endereço'}
              errorMessage={form.formState.errors.address?.message}
              labelPlacement="outside"
              {...form.register('address')}
              isReadOnly
            />
          </fieldset>
          <fieldset>
            <Input
              label={'Formação Acadêmica'}
              placeholder={'Informe a sua formação acadêmica'}
              errorMessage={form.formState.errors.academicEducation?.message}
              labelPlacement="outside"
              {...form.register('academicEducation')}
              isReadOnly
            />
          </fieldset>
          <fieldset>
            <Input
              type="number"
              startContent={<PriceIcon />}
              label={'Salário pretendido'}
              placeholder={'Informe o salário pretendido'}
              errorMessage={form.formState.errors.intendedSalary?.message}
              labelPlacement="outside"
              {...form.register('intendedSalary')}
              isReadOnly
            />
          </fieldset>
          <JobOpportunitiesSelect form={form} />
          <fieldset>
            <Input
              label={'Cargo Pretendido'}
              placeholder={'Informe o cargo pretendido'}
              errorMessage={form.formState.errors.desiredJobTitle?.message}
              labelPlacement="outside"
              {...form.register('desiredJobTitle')}
              isReadOnly
            />
          </fieldset>
          <fieldset>
            <Input
              label={'Nome da empresa em que trabalhou'}
              placeholder={'Informe o nome da empresa em que trabalhou'}
              errorMessage={form.formState.errors.companyName?.message}
              labelPlacement="outside"
              {...form.register('companyName')}
              isReadOnly
            />
          </fieldset>
          <fieldset>
            <Input
              label={'Cargo ocupado'}
              placeholder={'Informe o cargo em que trabalhou'}
              errorMessage={form.formState.errors.positionHeld?.message}
              labelPlacement="outside"
              {...form.register('positionHeld')}
              isReadOnly
            />
          </fieldset>
          <fieldset>
            <Input
              type="number"
              label={'Contato da empresa'}
              placeholder={'Informe o contato da empresa'}
              errorMessage={form.formState.errors.companyContact?.message}
              labelPlacement="outside"
              {...form.register('companyContact')}
              isReadOnly
            />
          </fieldset>
        <JobOpportunitiesSelect form={form} />
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
