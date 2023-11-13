import { GridLayout } from '@/components/ui/Grid'
import { RichEditor } from '@/components/ui/editor/RichEditor'
import { Text } from '@/components/ui/label/Text'
import { Chip } from '@nextui-org/react'
import { Controller, FieldArrayWithId } from 'react-hook-form'
import { WeeklyReportDataWithId } from '../weekly-report.schema'
import { FilesProcess } from './actions/processes.files'
import { RemoveProcess } from './actions/processes.remove'
import { useProcesses } from './context/ProcessProvider'
import { ProcessSelects } from './processes.selects'

type ProcessItemProps = {
  field: FieldArrayWithId<WeeklyReportDataWithId>
  index: number
}

export const ProcessItem = ({ field, index }: ProcessItemProps) => {
  const { t, form } = useProcesses()

  return (
    <GridLayout cols="1">
      <div className="flex flex-col gap-3">
        <div className="flex justify-end">
          <Chip
            size="sm"
            color={field.filesFolder ? 'primary' : 'success'}
            className="select-none"
          >
            {t('process.process_number', {
              value:
                field.filesFolder?.split('-')?.[0] || field.id.split('-')[0]
            })}
          </Chip>
        </div>
        <ProcessSelects index={index} />
        <div className="grid grid-cols-1 xs:grid-cols-[1fr_auto] gap-4">
          <fieldset>
            <Controller
              control={form.control}
              name={`processes.${index}.description`}
              render={({ field }) => (
                <>
                  <RichEditor
                    label={t('description.label')}
                    placeholder={t('description.placeholder')}
                    errorMessage={
                      form.formState.errors.processes?.[index]?.description
                        ?.message
                    }
                    limit={1000}
                    as="textarea-5"
                    {...field}
                  />
                </>
              )}
            />
          </fieldset>
          <div className="flex flex-col" role="actions">
            <Text text="Actions" isRequired />
            <div className="flex gap-2">
              <FilesProcess field={field} index={index} />
              <RemoveProcess index={index} />
            </div>
          </div>
        </div>
        <div>
          <Text text="Files to upload" />
          <div className="flex flex-wrap gap-2 overflow-hidden hover:overflow-y-auto max-h-24">
            <Chip
              onClose={() => console.log('close')}
              color={field.filesFolder ? 'primary' : 'success'}
              variant="flat"
            >
              Arquivo X
            </Chip>
          </div>
        </div>
      </div>
    </GridLayout>
  )
}
