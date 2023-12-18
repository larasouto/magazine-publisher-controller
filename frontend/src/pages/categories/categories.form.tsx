import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/ui/Grid'
import { useFetch } from '@/hooks/useFetch'
import { routes } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@nextui-org/react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  CategoryForm,
  CategoryFormWithId,
  CategorySchema
} from './categories.schema'

type CategoriesFormProps = {
  data?: CategoryFormWithId
}

export const CategoriesForm = ({ data }: CategoriesFormProps) => {
  const { t } = useTranslation('categories')

  const { create, update } = useFetch<CategoryForm>({
    baseUrl: routes.categories.index,
    query: ['categories'],
    fetch: {
      id: data?.id
    }
  })

  const form = useForm<CategoryForm>({
    mode: 'all',
    resolver: zodResolver(CategorySchema),
    defaultValues: data
  })

  const onSubmit = async (form: CategoryForm) => {
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
          <Controller
            control={form.control}
            name="name"
            render={({ field: { value, onChange, ...rest } }) => (
              <Input
                label={'Nome'}
                placeholder={'Digite o nome da categoria'}
                errorMessage={form.formState.errors.name?.message}
                labelPlacement="outside"
                value={value ?? ''}
                onValueChange={onChange}
                {...rest}
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
                label={'Descrição'}
                placeholder={'Digite a descrição da categoria'}
                errorMessage={form.formState.errors.description?.message}
                labelPlacement="outside"
                value={value ?? ''}
                onValueChange={onChange}
                {...rest}
              />
            )}
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
