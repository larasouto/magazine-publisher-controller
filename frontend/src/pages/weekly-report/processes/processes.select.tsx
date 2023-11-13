import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { WeeklyReportData } from '../weekly-report.schema'

type WeeklyEvaluationSelectProps = {
  form: UseFormReturn<WeeklyReportData>
}

const items = [
  {
    id: '109b84fa-afcb-4815-9600-450caad03556',
    label: 'Test 1'
  },
  {
    id: '6ad9b93c-6541-4be5-a090-24ed5fcdb889',
    label: 'Test 2'
  },
  {
    id: '4c435da4-310b-4462-a747-c1a6b3b46jua',
    label: 'Test 3'
  }
]

export const WeeklyEvaluationSelect = ({
  form
}: WeeklyEvaluationSelectProps) => {
  const { t } = useTranslation('weekly-report')

  return (
    <fieldset>
      <Controller
        control={form.control}
        name="weeklyEvaluationId"
        render={({ field: { value, onChange, ...rest } }) => (
          <Autocomplete
            items={items}
            label={t('weekly_evaluation.label')}
            labelPlacement="outside"
            placeholder={t('weekly_evaluation.placeholder')}
            errorMessage={form.formState.errors.weeklyEvaluationId?.message}
            selectedKey={String(value)}
            onSelectionChange={(value) => onChange(String(value ?? ''))}
            {...rest}
            isRequired
          >
            {(item) => (
              <AutocompleteItem key={item.id}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>
        )}
      />
    </fieldset>
  )
}
