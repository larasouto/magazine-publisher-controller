import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/layout/Grid'
import { useMagazine } from '@/hooks/useMagazine'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
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
  const { create, update } = useMagazine()

  const form = useForm<MagazineForm>({
    mode: 'all',
    resolver: zodResolver(MagazineSchema),
    defaultValues: data
  })

  const onSubmit = async (form: MagazineForm) => {
    if (data) {
      await update.mutateAsync({ id: data.id, ...form })
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
        <fieldset>
          <Input
            type="number"
            label={t('form.year_founded.label')}
            placeholder={t('form.year_founded.placeholder')}
            errorMessage={form.formState.errors.yearFounded?.message}
            labelPlacement="outside"
            {...form.register('yearFounded')}
            isRequired
            isClearable
          />
        </fieldset>
        <fieldset>
          <Select
            label={t('form.publication_period.label')}
            placeholder={t('form.publication_period.placeholder')}
            labelPlacement="outside"
            defaultSelectedKeys={[data?.publicationPeriod ?? 'MONTHLY']}
            {...form.register('publicationPeriod')}
            errorMessage={form.formState.errors.publicationPeriod?.message}
            disallowEmptySelection
            isRequired
          >
            {Object.keys(PublicationPeriod).map((key) => (
              <SelectItem key={key} value={key}>
                {t(`form.publication_period.options.${key.toLowerCase()}`)}
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