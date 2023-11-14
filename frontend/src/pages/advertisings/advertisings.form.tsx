import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/ui/Grid'
import { PriceIcon } from '@/components/ui/icons/PriceIcon'
import { useFetch } from '@/hooks/useFetch'
import { backend, routes } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  AdvertisingCategory,
  AdvertisingData,
  AdvertisingDataWithId,
  AdvertisingSchema,
  AdvertisingType
} from './advertisings.schema'
import { AdvertisingsImage } from './image/advertising.image'
import { MagazinesSelect } from './magazines/magazines-select'

type AdvertisingsFormProps = {
  data?: AdvertisingDataWithId
}

export const AdvertisingForm = ({ data }: AdvertisingsFormProps) => {
  const { t } = useTranslation('advertisings')

  const { create, update } = useFetch<AdvertisingData>({
    baseUrl: backend.advertisings.baseUrl,
    query: ['advertisings'],
    redirectTo: routes.advertisings.index,
    fetch: {
      id: data?.id
    }
  })

  const form = useForm<AdvertisingData>({
    mode: 'all',
    resolver: zodResolver(AdvertisingSchema),
    defaultValues: data
  })

  const onSubmit = async (form: AdvertisingData) => {
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
      <GridLayout className="grid grid-cols-1 lg:grid-cols-[auto_1fr]">
        <AdvertisingsImage
          form={form}
          errorMessage={form.formState.errors.imagePath?.message}
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
            />
          </fieldset>
          <fieldset>
            <Input
              label={t('form.description.label')}
              placeholder={t('form.description.placeholder')}
              errorMessage={form.formState.errors.description?.message}
              labelPlacement="outside"
              {...form.register('description')}
            />
          </fieldset>
          <fieldset>
            <Select
              label={t('form.advertising_type.label')}
              placeholder={t('form.advertising_type.placeholder')}
              labelPlacement="outside"
              defaultSelectedKeys={[String(data?.type ?? 1)]}
              {...form.register('type')}
              errorMessage={form.formState.errors.type?.message}
              disallowEmptySelection
              isRequired
            >
              {Object.values(AdvertisingType)
                .filter((value) => !isNaN(+value))
                .map((value) => (
                  <SelectItem key={value} value={value}>
                    {t(
                      `form.advertising_type.options.${AdvertisingType[
                        value
                      ].toLowerCase()}`
                    )}
                  </SelectItem>
                ))}
            </Select>
          </fieldset>
          <fieldset>
            <Select
              label={t('form.advertising_category.label')}
              placeholder={t('form.advertising_category.placeholder')}
              labelPlacement="outside"
              defaultSelectedKeys={[String(data?.category ?? 1)]}
              {...form.register('category')}
              errorMessage={String(form.formState.errors.category?.message)}
              disallowEmptySelection
              isRequired
            >
              {Object.values(AdvertisingCategory)
                .filter((value) => !isNaN(+value))
                .map((value) => (
                  <SelectItem key={value} value={value}>
                    {t(
                      `form.advertising_category.options.${AdvertisingCategory[
                        value
                      ].toLowerCase()}`
                    )}
                  </SelectItem>
                ))}
            </Select>
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
            />
          </fieldset>
          <MagazinesSelect form={form} />
          <fieldset>
            <Input
              className="hidden"
              label={t('form.image.label')}
              placeholder={t('form.image.placeholder')}
              errorMessage={form.formState.errors.imagePath?.message}
              labelPlacement="outside"
              {...form.register('imagePath')}
              isRequired
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
