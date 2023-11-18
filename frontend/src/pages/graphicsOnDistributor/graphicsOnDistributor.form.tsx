import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/ui/Grid'
import { useFetch } from '@/hooks/useFetch'
import { backend, routes } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  GraphocsOnDistributorForm,
  GraphocsOnDistributorsFormWithId,
  GraphocsOnDistributorsSchema
} from './graphicsOnDistributor.schema'
import { DistributorSelect } from './distributos/distributor-select'
import { GraphicsSelect } from './graphics/graphics-select'

type GraphocsOnDistributorsFormProps = {
  data?: GraphocsOnDistributorsFormWithId
}

export const GraphocsOnDistributorsForm = ({
  data
}: GraphocsOnDistributorsFormProps) => {
  const { t } = useTranslation('graphicsOnDistributor')

  const { create, update } = useFetch<GraphocsOnDistributorForm>({
    baseUrl: backend.graphicsOnDistributor.baseUrl,
    query: ['graphicsOnDistributor'],
    redirectTo: routes.graphicsOnDistributor.index,
    fetch: {
      id: data?.id
    }
  })

  const form = useForm<GraphocsOnDistributorForm>({
    mode: 'all',
    resolver: zodResolver(GraphocsOnDistributorsSchema),
    defaultValues: data
  })

  const onSubmit = async (form: GraphocsOnDistributorForm) => {
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
      <GridLayout cols="2">
      <DistributorSelect form={form} />
      <GraphicsSelect form={form} />
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
