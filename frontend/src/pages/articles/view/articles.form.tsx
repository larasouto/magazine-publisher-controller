import { SubmitButton } from '@/components/SubmitButton'
import { RichEditor } from '@/components/editor/RichEditor'
import { GridLayout } from '@/components/ui/Grid'
import { useFetch } from '@/hooks/useFetch'
import { backend, routes } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@nextui-org/react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  ArticleData,
  ArticleDataWithId,
  ArticleSchema
} from '../articles.schema'
import { CategoriesSelect } from '../categories/categories-select'
import { EditionsSelect } from '../editions/editions-select'
import { ArticlesImage } from '../image/articles.images'
import { PhotographersSelect } from '../photographers/photographers-select'
import { ReportersSelect } from '../reporters/reporters-select'
import { ThemesSelect } from '../themes/themes-select'

type ArticlesFormProps = {
  data?: ArticleDataWithId
}

export const ArticleForm = ({ data }: ArticlesFormProps) => {
  const { t } = useTranslation('articles')
  const [output, setOutput] = useState('')

  const { create, update } = useFetch<ArticleData>({
    baseUrl: backend.articles.baseUrl,
    query: ['articles'],
    redirectTo: routes.articles.index,
    fetch: {
      id: data?.id
    }
  })

  const form = useForm<ArticleData>({
    mode: 'all',
    resolver: zodResolver(ArticleSchema),
    defaultValues: data
  })

  const onSubmit = async (form: ArticleData) => {
    setOutput(JSON.stringify(form, null, 2))
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
        <ArticlesImage
          form={form}
          errorMessage={form.formState.errors.imagePath?.message}
        />
        <GridLayout cols="3">
          <fieldset>
            <Input
              label={'Título'}
              placeholder={'Informe o título da reportagem'}
              errorMessage={form.formState.errors.title?.message}
              labelPlacement="outside"
              {...form.register('title')}
              isReadOnly
            />
          </fieldset>
          <fieldset>
            <Input
              label={'Subtítulo'}
              placeholder={'Informe o subtítulo da reportagem'}
              errorMessage={form.formState.errors.subtitle?.message}
              labelPlacement="outside"
              {...form.register('subtitle')}
              isReadOnly
            />
          </fieldset>
        </GridLayout>
        <GridLayout cols="1">
          <fieldset>
            <Controller
              control={form.control}
              name="text"
              render={({ field }) => (
                <RichEditor
                  label={'Texto'}
                  placeholder={'Informe o texto da reportagem'}
                  errorMessage={form.formState.errors.text?.message}
                  limit={2000}
                  isFixed
                  as="textarea-5"
                  {...field}
                />
              )}
            />
          </fieldset>
        </GridLayout>
        <GridLayout cols="3">
          <fieldset>
            <Input
              type="number"
              label={'Número de páginas'}
              placeholder={'Informe o número de páginas da reportagem'}
              errorMessage={form.formState.errors.numberOfPages?.message}
              labelPlacement="outside"
              {...form.register('numberOfPages')}
              isReadOnly
            />
          </fieldset>
          <fieldset>
            <Input
              type="number"
              label={'Página inicial'}
              placeholder={'Informe a página incial da reportagen'}
              errorMessage={form.formState.errors.initialPage?.message}
              labelPlacement="outside"
              {...form.register('initialPage')}
              isReadOnly
            />
          </fieldset>
          <fieldset>
            <Input
              type="number"
              label={'Página final'}
              placeholder={'Informe a página final da reportagem'}
              errorMessage={form.formState.errors.finalPage?.message}
              labelPlacement="outside"
              {...form.register('finalPage')}
              isReadOnly
            />
          </fieldset>
          <GridLayout cols="2">
            <EditionsSelect form={form} />
            <ThemesSelect form={form} />
            <CategoriesSelect form={form} />
            <ReportersSelect form={form} />
            <PhotographersSelect form={form} />
            RJC
          </GridLayout>
          <pre>{output}</pre>
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
