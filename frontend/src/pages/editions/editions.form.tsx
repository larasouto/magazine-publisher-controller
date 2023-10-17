import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/ui/Grid'
import { DatePicker } from '@/components/ui/date-picker/DatePicker'
import { PriceIcon } from '@/components/ui/icons/PriceIcon'
import { useFetch } from '@/hooks/useFetch'
import { backend } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { EditionsCover } from './cover/editions.cover'
import {
  EditionForm,
  EditionFormWithId,
  EditionSchema
} from './editions.schema'
import { MagazinesSelect } from './magazines/magazines-select'

type EditionsFormProps = {
  data?: EditionFormWithId
}

export const EditionsForm = ({ data }: EditionsFormProps) => {
  const { t } = useTranslation('editions')

  const { create, update } = useFetch<EditionForm>({
    baseUrl: backend.editions.baseUrl,
    query: ['editions'],
    fetch: {
      id: data?.id
    }
  })

  const form = useForm<EditionForm>({
    mode: 'all',
    resolver: zodResolver(EditionSchema),
    defaultValues: data
  })

  const onSubmit = async (form: EditionForm) => {
    if (data) {
      await update.mutateAsync(form)
      return
    }
    await create.mutateAsync(form)
  }

  console.table(form.formState.errors)

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-3"
      noValidate
    >
      <GridLayout className="grid grid-cols-1 lg:grid-cols-[auto_1fr]">
        <EditionsCover
          form={form}
          errorMessage={form.formState.errors.coverPath?.message}
        />
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
              startContent={<PriceIcon />}
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
              render={({ field }) => (
                <DatePicker
                  field={field}
                  label={t('form.publication_date.label')}
                  errorMessage={form.formState.errors.publicationDate?.message}
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date > new Date() || date < new Date('1900-01-01')
                  }
                  initialFocus
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
