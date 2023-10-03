import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/layout/Grid'
import { useNewsReports } from '@/hooks/useNewsReports'
import { zodResolver } from '@hookform/resolvers/zod'
import { Divider, Input, Select, SelectItem } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  NewsReportForm,
  NewsReportFormWithId,
  NewsReportsSchema
} from './news-reports.schema'

type NewsReportsFormProps = {
  data?: NewsReportFormWithId
}

export const NewsReportsForm = ({ data }: NewsReportsFormProps) => {
  const { t } = useTranslation('news-reports')
  const { create, update } = useNewsReports()

  const form = useForm<NewsReportForm>({
    mode: 'all',
    resolver: zodResolver(NewsReportsSchema),
    defaultValues: data
  })

  const onSubmit = async (form: NewsReportForm) => {
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
            type="number"
            label={t('form.numberOfPages.label')}
            placeholder={t('form.numberOfPages.placeholder')}
            errorMessage={form.formState.errors.numberOfPages?.message}
            labelPlacement="outside"
            {...form.register('numberOfPages')}
            isRequired
            isClearable
          />
        </fieldset>
        <fieldset>
          <Input
            type="number"
            label={t('form.initialPage.label')}
            placeholder={t('form.initialPage.placeholder')}
            errorMessage={form.formState.errors.initialPage?.message}
            labelPlacement="outside"
            {...form.register('initialPage')}
            isRequired
            isClearable
          />
        </fieldset>
        <fieldset>
          <Input
            type="number"
            label={t('form.finalPage.label')}
            placeholder={t('form.finalPage.placeholder')}
            errorMessage={form.formState.errors.finalPage?.message}
            labelPlacement="outside"
            {...form.register('finalPage')}
            isRequired
            isClearable
          />
        </fieldset>
        <fieldset>
          <Input
            type="number"
            label={t('form.numberOfPhotos.label')}
            placeholder={t('form.numberOfPhotos.placeholder')}
            errorMessage={form.formState.errors.numberOfPhotos?.message}
            labelPlacement="outside"
            {...form.register('numberOfPhotos')}
            isRequired
            isClearable
          />
        </fieldset>
      </GridLayout>
      <Divider className="my-2" />
      <GridLayout cols="3">
        <fieldset>
          <Select
            label={t('form.category.label')}
            placeholder={t('form.category.placeholder')}
            labelPlacement="outside"
            {...form.register('categoryId')}
            disallowEmptySelection
            selectionMode="multiple"
            isRequired
          >
            <SelectItem key={'1'} textValue={'Teste 1'}>
              <div className="flex flex-col">
                <span className="text-small">Teste</span>
                <span className="text-tiny text-default-400">
                  Teste descrição
                </span>
              </div>
            </SelectItem>
            <SelectItem key={'2'} textValue={'Teste 2'}>
              <div className="flex flex-col">
                <span className="text-small">Teste 2</span>
                <span className="text-tiny text-default-400">
                  Teste descrição 2
                </span>
              </div>
            </SelectItem>
          </Select>
        </fieldset>
        <fieldset>
          <Select
            label={t('form.category.label')}
            placeholder={t('form.category.placeholder')}
            labelPlacement="outside"
            {...form.register('categoryId')}
            disallowEmptySelection
            selectionMode="multiple"
            isRequired
          >
            <SelectItem key={'1'} textValue={'Teste 1'}>
              <div className="flex flex-col">
                <span className="text-small">Teste</span>
                <span className="text-tiny text-default-400">
                  Teste descrição
                </span>
              </div>
            </SelectItem>
            <SelectItem key={'2'} textValue={'Teste 2'}>
              <div className="flex flex-col">
                <span className="text-small">Teste 2</span>
                <span className="text-tiny text-default-400">
                  Teste descrição 2
                </span>
              </div>
            </SelectItem>
          </Select>
        </fieldset>
        <fieldset>
          <Select
            label={t('form.category.label')}
            placeholder={t('form.category.placeholder')}
            labelPlacement="outside"
            {...form.register('categoryId')}
            disallowEmptySelection
            selectionMode="multiple"
            isRequired
          >
            <SelectItem key={'1'} textValue={'Teste 1'}>
              <div className="flex flex-col">
                <span className="text-small">Teste</span>
                <span className="text-tiny text-default-400">
                  Teste descrição
                </span>
              </div>
            </SelectItem>
            <SelectItem key={'2'} textValue={'Teste 2'}>
              <div className="flex flex-col">
                <span className="text-small">Teste 2</span>
                <span className="text-tiny text-default-400">
                  Teste descrição 2
                </span>
              </div>
            </SelectItem>
          </Select>
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
