import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/ui/Grid'
import { useFetch } from '@/hooks/useFetch'
import { backend, routes } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  ArticleData,
  ArticleDataWithId,
  ArticleSchema
} from './articles.schema'
import { CategoriesSelect } from './categories/categories-select'
import { EditionsSelect } from './editions/editions-select'
import { ArticlesImage } from './image/articles.images'
import { ThemesSelect } from './themes/themes-select'

type ArticlesFormProps = {
  data?: ArticleDataWithId
}

export const ArticleForm = ({ data }: ArticlesFormProps) => {
  const { t } = useTranslation('articles')

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
    if (data) {
      console.log('update', form)
      await update.mutateAsync(form)
      return
    }
    console.log('create', form)
    await create.mutateAsync(form)
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-3"
      noValidate
    >
      <GridLayout className="grid grid-cols-1 lg:grid-cols-[auto_1fr]">
        <ArticlesImage
          form={form}
          errorMessage={form.formState.errors.imagePaths?.message}
        />
        <GridLayout cols="3">
          <fieldset>
            <Input
              label={'Título'}
              placeholder={'Informe o título da reportagem'}
              errorMessage={form.formState.errors.title?.message}
              labelPlacement="outside"
              {...form.register('title')}
              isRequired
            />
          </fieldset>
          <fieldset>
            <Input
              label={'Subtítulo'}
              placeholder={'Informe o subtítulo da propaganda'}
              errorMessage={form.formState.errors.subtitle?.message}
              labelPlacement="outside"
              {...form.register('subtitle')}
            />
          </fieldset>
          <fieldset>
            <Input
              label={'Texto'}
              placeholder={'Informe o texto da propaganda'}
              errorMessage={form.formState.errors.text?.message}
              labelPlacement="outside"
              {...form.register('text')}
            />
          </fieldset>
          <fieldset>
            <Input
              label={'Número de páginas'}
              placeholder={'Informe o número de páginas da reportagem'}
              errorMessage={form.formState.errors.numberOfPages?.message}
              labelPlacement="outside"
              {...form.register('subtitle')}
            />
          </fieldset>
          <fieldset>
            <Input
              label={'Página inicial'}
              placeholder={'Informe a página incial da propaganda'}
              errorMessage={form.formState.errors.subtitle?.message}
              labelPlacement="outside"
              {...form.register('subtitle')}
            />
          </fieldset>
          <fieldset>
            <Input
              label={'Página final'}
              placeholder={'Informe a página final da propaganda'}
              errorMessage={form.formState.errors.subtitle?.message}
              labelPlacement="outside"
              {...form.register('subtitle')}
            />
          </fieldset>
          <EditionsSelect form={form} />
          <ThemesSelect form={form} />
          <CategoriesSelect form={form} />
          <fieldset>
            <Input
              className="hidden"
              label={'Imagens'}
              placeholder={'Informe as imagens e gráficos da propaganda'}
              errorMessage={form.formState.errors.imagePaths?.message}
              labelPlacement="outside"
              {...form.register('imagePaths')}
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
