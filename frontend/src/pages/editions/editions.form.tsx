import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/layout/Grid'
import { useEdition } from '@/hooks/useEditions'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@nextui-org/react'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  EditionForm,
  EditionFormWithId,
  EditionSchema
} from './editions.schema'
import { MagazinesSelect } from './magazines/magazines-select'

type EditionsFormProps = {
  data?: EditionFormWithId
}

export const MagazinesForm = ({ data }: EditionsFormProps) => {
  const { t } = useTranslation('editions')
  const { create, update } = useEdition()

  const form = useForm<EditionForm>({
    mode: 'all',
    resolver: zodResolver(EditionSchema),
    defaultValues: data
  })

  /**
   * Retirar esse trecho de código quando o envio de arquivos
   *  estiver pronto.
   */
  useEffect(() => {
    form.setValue(
      'coverPath',
      `/revista${Math.floor(Math.random() * 4 + 1)}.jpg`
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = async (form: EditionForm) => {
    console.table(form)
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
            label={t('form.title.label')}
            placeholder={t('form.title.placeholder')}
            errorMessage={form.formState.errors.title?.message}
            labelPlacement="outside"
            {...form.register('title')}
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
            label={t('form.price.label')}
            placeholder={t('form.price.placeholder')}
            errorMessage={form.formState.errors.price?.message}
            labelPlacement="outside"
            {...form.register('price')}
            isRequired
            isClearable
          />
        </fieldset>
        <fieldset>
          <Input
            type="number"
            label={t('form.year.label')}
            placeholder={t('form.year.placeholder')}
            errorMessage={form.formState.errors.year?.message}
            labelPlacement="outside"
            {...form.register('year')}
            isRequired
            isClearable
          />
        </fieldset>
        <fieldset>
          <Input
            type="number"
            label={t('form.number.label')}
            placeholder={t('form.number.placeholder')}
            errorMessage={form.formState.errors.number?.message}
            labelPlacement="outside"
            {...form.register('number')}
            isRequired
            isClearable
          />
        </fieldset>
        <fieldset>
          <Input
            type="number"
            label={t('form.number_of_copies.label')}
            placeholder={t('form.number_of_copies.placeholder')}
            errorMessage={form.formState.errors.numberOfCopies?.message}
            labelPlacement="outside"
            {...form.register('numberOfCopies')}
            isRequired
            isClearable
          />
        </fieldset>
        <fieldset>
          <Input
            type="number"
            label={t('form.number_of_pages.label')}
            placeholder={t('form.number_of_pages.placeholder')}
            errorMessage={form.formState.errors.numberOfPages?.message}
            labelPlacement="outside"
            {...form.register('numberOfPages')}
            isRequired
            isClearable
          />
        </fieldset>
        <fieldset>
          <Controller
            control={form.control}
            name="publicationDate"
            render={({ field: { value, ref, onChange, onBlur } }) => (
              <Input
                type="date"
                ref={ref}
                label={t('form.publication_date.label')}
                placeholder={t('form.publication_date.placeholder')}
                errorMessage={form.formState.errors.publicationDate?.message}
                labelPlacement="outside"
                value={value?.toString().split('T')[0]}
                onChange={onChange}
                onBlur={onBlur}
                isRequired
              />
            )}
          />
        </fieldset>
        <MagazinesSelect form={form} />
        <fieldset>
          <Input
            className="hidden"
            label={t('form.cover.label')}
            placeholder={t('form.cover.placeholder')}
            errorMessage={form.formState.errors.coverPath?.message}
            labelPlacement="outside"
            {...form.register('coverPath')}
            isRequired
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
