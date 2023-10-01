import { SubmitButton } from '@/components/SubmitButton'
import { useCategory } from '@/hooks/useCategory'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@nextui-org/react'
import { InputMask } from '@react-input/mask'
import { useForm } from 'react-hook-form'
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
  const { create, update } = useCategory()

  const form = useForm<CategoryForm>({
    mode: 'all',
    resolver: zodResolver(CategorySchema),
    defaultValues: data
  })

  const onSubmit = async (form: CategoryForm) => {
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
      <fieldset>
        <InputMask
          mask="___.___.___-__"
          replacement={{ _: /\d/ }}
          component={Input}
          label={t('form.name.label')}
          placeholder={t('form.name.placeholder')}
          errorMessage={form.formState.errors.name?.message}
          labelPlacement="outside"
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
