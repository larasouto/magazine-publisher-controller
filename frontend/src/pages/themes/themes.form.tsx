import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/ui/Grid'
import { useFetch } from '@/hooks/useFetch'
import { backend, routes } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { ThemeForm, ThemesFormWithId, ThemesSchema } from './themes.schema'

type ThemesFormProps = {
  data?: ThemesFormWithId
}

export const ThemesForm = ({ data }: ThemesFormProps) => {
  const { t } = useTranslation('themes')

  const { create, update } = useFetch<ThemeForm>({
    baseUrl: backend.themes.baseUrl,
    query: ['themes'],
    redirectTo: routes.themes.index,
    fetch: {
      id: data?.id
    }
  })

  const form = useForm<ThemeForm>({
    mode: 'all',
    resolver: zodResolver(ThemesSchema),
    defaultValues: data
  })

  const onSubmit = async (form: ThemeForm) => {
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
            label={t('form.description.label')}
            placeholder={t('form.description.placeholder')}
            errorMessage={form.formState.errors.description?.message}
            labelPlacement="outside"
            {...form.register('description')}
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
