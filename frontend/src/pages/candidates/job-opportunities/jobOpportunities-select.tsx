import { useFetch } from '@/hooks/useFetch'
import { backend } from '@/routes/routes'
import { Select, SelectItem } from '@nextui-org/react'
import { UseFormReturn } from 'react-hook-form'
import { ArticleData } from '../candidates.schema'
import { JobOpportunityColumns } from '@/pages/job-opportunities/table/jobOpportunities.columns'

type JobOpportunitiesSelectProps = {
  form: UseFormReturn<ArticleData>
}

export const JobOpportunitiesSelect = ({ form }: JobOpportunitiesSelectProps) => {
  const { list } = useFetch<JobOpportunityColumns[]>({
    baseUrl: backend.jobOpportunities.baseUrl,
    query: ['jobOpportunities'],
    fetch: {
      list: true
    }
  })

  return (
    <fieldset>
      <Select
        items={list?.data ?? []}
        label={'Vaga de Emprego'}
        placeholder={'Selecione uma vaga de emprego'}
        labelPlacement="outside"
        {...form.register('jobOpportunityId')}
        defaultSelectedKeys={
          form.getValues('jobOpportunityId')
            ? [form.getValues('jobOpportunityId')]
            : undefined
        }
        isLoading={list.isLoading}
        disallowEmptySelection
        errorMessage={form.formState.errors.jobOpportunityId?.message}
        isRequired
      >
        {(jobOpportunity) => (
          <SelectItem key={jobOpportunity.id} textValue={jobOpportunity.office}>
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <span className="text-small">{jobOpportunity.office}</span>
                <span className="text-tiny text-default-500">
                  {jobOpportunity.requirements}
                  {jobOpportunity.hours}
                  {jobOpportunity.wage}
                </span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
    </fieldset>
  )
}
