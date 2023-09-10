import { useForm } from 'react-hook-form'
import { AddEditSchema, defaultValues, AddEdit } from './add-edit.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardHeader, Button, Input } from '@nextui-org/react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

export const AddEditForm = () => {
  const { t } = useTranslation('auth')

  const form = useForm<AddEdit>({
    mode: 'all',
    resolver: zodResolver(AddEditSchema),
    defaultValues: defaultValues
  })

  const onSubmit = (data: AddEdit) => {
    // Aqui você pode enviar os dados do formulário para o backend ou fazer o que for necessário.
    // Substitua o código abaixo com sua lógica de envio de dados.
    console.log('Título da Capa:', data.title)
    console.log('Número da Edição:', data.edition_number)
    console.log('Tiragem:', data.drawing)
    console.log('Valor:', data.value)
    console.log('Subtítulo:', data.caption)

    // Limpe os campos após o envio
    form.reset()

    toast.success(t('add-edit.success'))
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-md">
        <Card>
          <CardHeader className="ml-2 flex gap-4">
            <div className="flex flex-col gap-0.5">
              <h1 className="text-2xl font-bold">{t('add edit')}</h1>
            </div>
          </CardHeader>
          <div className="p-4 space-y-4">
            <Input
              {...form.register('title')}
              type="text"
              label={t('Title')}
              placeholder={t('inform the title')}
              labelPlacement="outside"
              errorMessage={form.formState.errors.title?.message}
              autoComplete="off"
            />
            <Input
              {...form.register('caption')}
              type="text"
              label={t('caption')}
              placeholder={t('inform the caption')}
              labelPlacement="outside"
              errorMessage={form.formState.errors.caption?.message}
              autoComplete="off"
            />
            <Input
              {...form.register('drawing')}
              type="text"
              label={t('drawing')}
              placeholder={t('inform the drawing')}
              labelPlacement="outside"
              errorMessage={form.formState.errors.drawing?.message}
              autoComplete="off"
            />{' '}
            <Input
              {...form.register('publication_date')}
              type="date"
              label={t('publication date')}
              placeholder={t('inform the publication_date')}
              labelPlacement="outside"
              errorMessage={form.formState.errors.publication_date?.message}
              autoComplete="off"
            />
            <Input
              {...form.register('value')}
              type="money"
              label={t('value')}
              placeholder={t('inform the value')}
              labelPlacement="outside"
              errorMessage={form.formState.errors.value?.message}
              autoComplete="off"
            />
            <Input
              {...form.register('edition_number')}
              type="money"
              label={t('edition number')}
              placeholder={t('inform the edition_number')}
              labelPlacement="outside"
              errorMessage={form.formState.errors.edition_number?.message}
              autoComplete="off"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Button
              type="submit"
              color="primary"
              variant="solid"
              className="w-full mx-2"
            >
              {t('Add Edit')}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  )
}
