import { GridLayout } from '@/components/ui/Grid'
import { SubmitButton } from '@/components/ui/SubmitButton'
import { RichEditor } from '@/components/ui/editor/RichEditor'
import { Workspace } from '@/stores/useWorkspaceStore'
import { clearHTMLTags } from '@/utils/replace-html-tags'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@nextui-org/react'
import { Copy } from 'lucide-react'
import { useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useWeeklyReport } from './processes/context/WeeklyReportProvider'
import { WeeklyReportProcesses } from './processes/processes'
import { WeeklyEvaluationSelect } from './processes/processes.select'
import {
  WeeklyReportData,
  WeeklyReportDataWithId,
  WeeklyReportSchema
} from './weekly-report.schema'

type WeeklyReportFormProps = {
  data?: WeeklyReportDataWithId
}

export const WeeklyReportForm = ({ data }: WeeklyReportFormProps) => {
  const { t } = useTranslation('weekly-report')
  const [output, setOutput] = useState('')
  const { images } = useWeeklyReport()

  const form = useForm<WeeklyReportData>({
    mode: 'all',
    resolver: zodResolver(WeeklyReportSchema),
    defaultValues: data
  })

  const onSubmit = async (form: WeeklyReportData) => {
    setOutput(JSON.stringify(form, null, 2))
    console.table(form)
    console.log(images)
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
        noValidate
      >
        <GridLayout cols="2">
          <WeeklyEvaluationSelect form={form} />
          <fieldset>
            <Input
              label={t('linked_project.label')}
              labelPlacement="outside"
              placeholder={t('linked_project.placeholder')}
              value={clearHTMLTags(Workspace.getWorkspace()?.name || '')}
              endContent={
                <Copy
                  className="w-4 h-4 hover:text-primary cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      form.getValues('projectId') ||
                        Workspace.getWorkspace()?.id ||
                        t('linked_project.placeholder')
                    )
                    toast.success('Copied to clipboard', {
                      id: 'copy-to-clipboard'
                    })
                  }}
                />
              }
              isRequired
              isReadOnly
            />
          </fieldset>
        </GridLayout>
        <GridLayout cols="1">
          <fieldset>
            <Controller
              control={form.control}
              name="toolEvaluation"
              render={({ field }) => (
                <RichEditor
                  label={t('tool_evaluation.label')}
                  placeholder={t('tool_evaluation.placeholder')}
                  errorMessage={form.formState.errors.toolEvaluation?.message}
                  limit={1000}
                  isFixed
                  as="textarea-4"
                  {...field}
                />
              )}
            />
          </fieldset>
        </GridLayout>
        <GridLayout cols="1">
          <WeeklyReportProcesses />
        </GridLayout>
        <SubmitButton
          isEdit={!!data}
          fnResetButton={form.reset}
          // isLoading={create.isLoading || update.isLoading}
        />
        <pre>{output}</pre>
      </form>
    </FormProvider>
  )
}
