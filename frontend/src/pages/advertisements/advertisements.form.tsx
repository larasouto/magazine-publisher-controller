import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/ui/Grid'
import { DatePicker } from '@/components/ui/date-picker/DatePicker'
import { PriceIcon } from '@/components/ui/icons/PriceIcon'
import { useFetch } from '@/hooks/useFetch'
import { backend } from '@/routes/routes'
import { useTranslation } from 'react-i18next'
import {
  AdvertisingForm,
  AdvertisingFormWithId,
  AdvertisingSchema
} from './advertisements.schema'
import { MagazinesSelect } from '@/pages/advertisements/magazines/magazines-select'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@nextui-org/react'
import { useEffect } from 'react'

type AdvertisementsFormProps = {
  data?: AdvertisingFormWithId
}

export const AdvertisementsForm = ({ data }: AdvertisementsFormProps) => {
  const { t } = useTranslation('Advertisements')

  const { create, update } = useFetch<AdvertisingForm>({
    baseUrl: backend.advertisements.baseUrl,
    query: ['advertisements'],
    fetch: {
      id: data?.id
    }
  })

  const form = useForm<AdvertisingForm>({
    mode: 'all',
    resolver: zodResolver(AdvertisingSchema),
    defaultValues: data
  })

  // TODO: Remover quando o envio de arquivos estiver pronto.
  useEffect(() => {
    form.setValue(
      'coverPath',
      `/revista${Math.floor(Math.random() * 7 + 1)}.jpg`
    )
  }, [form])

  const onSubmit = async (form: AdvertisingForm) => {
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
            label={t('form.categoryAdvertising.label')}
            placeholder={t('form.categoryAdvertising.placeholder')}
            errorMessage={form.formState.errors.categoryAdvertising?.message}
            labelPlacement="outside"
            {...form.register('categoryAdvertising')}
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
                label={t('form.departure_date.label')}
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
