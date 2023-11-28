import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/ui/Grid'
import { useFetch } from '@/hooks/useFetch'
import { backend, routes } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { BookstoreForm, BookstoresFormWithId, BookstoresSchema } from './bookstores.schema'

type BookstoresFormProps = {
  data?: BookstoresFormWithId
}

export const BookstoresForm = ({ data }: BookstoresFormProps) => {
  const { t } = useTranslation('Bookstores')

  const { create, update } = useFetch<BookstoreForm>({
    baseUrl: backend.bookstores.baseUrl,
    query: ['Bookstores'],
    redirectTo: routes.bookstores.index,
    fetch: {
      id: data?.id
    }
  })

  const form = useForm<BookstoreForm>({
    mode: 'all',
    resolver: zodResolver(BookstoresSchema),
    defaultValues: data
  })

  const onSubmit = async (form: BookstoreForm) => {
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
          <Input
            label={t('Nome')}
            placeholder={t('Informe o nome')}
            errorMessage={form.formState.errors.name?.message}
            labelPlacement="outside"
            {...form.register('name')}
            isRequired
          />
        </fieldset>
        <fieldset>
          <Input
            label={t('Endereço')}
            placeholder={t('informe o endereço')}
            errorMessage={form.formState.errors.address?.message}
            labelPlacement="outside"
            {...form.register('address')}
            isRequired
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
