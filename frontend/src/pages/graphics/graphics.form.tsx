import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/ui/Grid'
import { useFetch } from '@/hooks/useFetch'
import { backend, routes } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { GraphicForm, GraphicsFormWithId, GraphicsSchema } from './graphics.schema'

type GraphicsFormProps = {
  data?: GraphicsFormWithId
}

export const GraphicsForm = ({ data }: GraphicsFormProps) => {
  const { t } = useTranslation('themes')

  const { create, update } = useFetch<GraphicForm>({
    baseUrl: backend.themes.baseUrl,
    query: ['graphics'],
    redirectTo: routes.themes.index,
    fetch: {
      id: data?.id
    }
  })

  const form = useForm<GraphicForm>({
    mode: 'all',
    resolver: zodResolver(GraphicsSchema),
    defaultValues: data
  })

  const onSubmit = async (form: GraphicForm) => {
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
            label={t('form.name.label')}
            placeholder={t('form.name.placeholder')}
            errorMessage={form.formState.errors.name?.message}
            labelPlacement="outside"
            {...form.register('name')}
            isRequired
            isClearable
          />
        </fieldset>
        <fieldset>
          <Input
            label={t('form.address.label')}
            placeholder={t('form.address.placeholder')}
            errorMessage={form.formState.errors.address?.message}
            labelPlacement="outside"
            {...form.register('address')}
            isClearable
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
