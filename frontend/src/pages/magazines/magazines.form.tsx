import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/ui/Grid'
import { useFetch } from '@/hooks/useFetch'
import { backend, routes } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  MagazineForm,
  MagazineFormWithId,
  MagazineSchema,
  PublicationPeriod
} from './magazines.schema'
import { ThemesSelect } from './themes/themes-select'

type MagazinesFormProps = {
  data?: MagazineFormWithId
}

export const MagazinesForm = ({ data }: MagazinesFormProps) => {
  const { t } = useTranslation('magazines')

  const { create, update } = useFetch<MagazineForm>({
    baseUrl: backend.magazines.baseUrl,
    query: ['magazines', 'subscriptions'],
    redirectTo: routes.magazines.index,
    fetch: {
      id: data?.id
    }
  })

  const form = useForm<MagazineForm>({
    mode: 'all',
    resolver: zodResolver(MagazineSchema),
    defaultValues: data
  })

  const onSubmit = async (form: MagazineForm) => {
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
          <Controller
            control={form.control}
            name="name"
            render={({ field: { value, onChange, ...rest } }) => (
              <Input
                label={t('form.name.label')}
                placeholder={t('form.name.placeholder')}
                errorMessage={form.formState.errors.name?.message}
                labelPlacement="outside"
                {...rest}
                value={value ?? ''}
                onChange={onChange}
                isRequired
              />
            )}
          />
        </fieldset>
        <fieldset>
          <Controller
            control={form.control}
            name="description"
            render={({ field: { value, onChange, ...rest } }) => (
              <Input
                label={t('form.description.label')}
                placeholder={t('form.description.placeholder')}
                errorMessage={form.formState.errors.description?.message}
                labelPlacement="outside"
                {...rest}
                value={value ?? ''}
                onChange={onChange}
              />
            )}
          />
        </fieldset>
        <fieldset>
          <Controller
            control={form.control}
            name="yearFounded"
            render={({ field: { value, onChange, ...rest } }) => (
              <Input
                type="number"
                label={t('form.year_founded.label')}
                placeholder={t('form.year_founded.placeholder')}
                errorMessage={form.formState.errors.yearFounded?.message}
                labelPlacement="outside"
                isRequired
                value={String(value ?? '')}
                onValueChange={onChange}
                {...rest}
              />
            )}
          />
        </fieldset>
        <fieldset>
          <Select
            label={t('form.publication_period.label')}
            placeholder={t('form.publication_period.placeholder')}
            labelPlacement="outside"
            defaultSelectedKeys={[String(data?.publicationPeriod ?? 1)]}
            {...form.register('publicationPeriod')}
            errorMessage={form.formState.errors.publicationPeriod?.message}
            disallowEmptySelection
            isRequired
          >
            {Object.values(PublicationPeriod)
              .filter((value) => !isNaN(+value))
              .map((value) => (
                <SelectItem key={value} value={value}>
                  {t(
                    `form.publication_period.options.${PublicationPeriod[
                      value
                    ].toLowerCase()}`
                  )}
                </SelectItem>
              ))}
          </Select>
        </fieldset>
        <ThemesSelect form={form} />
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
