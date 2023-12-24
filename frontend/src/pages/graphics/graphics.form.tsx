import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/ui/Grid'
import { useFetch } from '@/hooks/useFetch'
import { backend, routes } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@nextui-org/react'
import { InputMask } from '@react-input/mask'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  GraphicForm,
  GraphicsFormWithId,
  GraphicsSchema
} from './graphics.schema'
import { SelectState } from './select/addresses.states'

type GraphicsFormProps = {
  data?: GraphicsFormWithId
}

export const GraphicsForm = ({ data }: GraphicsFormProps) => {
  const { t } = useTranslation('Graphics')

  const { create, update } = useFetch<GraphicForm>({
    baseUrl: backend.graphics.baseUrl,
    query: ['Graphics'],
    redirectTo: routes.graphics.index,
    fetch: {
      id: data?.id
    }
  })

  const form = useForm<GraphicForm>({
    mode: 'all',
    resolver: zodResolver(GraphicsSchema),
    defaultValues: data
  })

  const onSubmit = async (form: GraphicForm) => {
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
            label={'Nome da gráfica'}
            placeholder={'Informe o nome da gráfica'}
            errorMessage={form.formState.errors.name?.message}
            labelPlacement="outside"
            {...form.register('name')}
            isRequired
          />
        </fieldset>
        <fieldset>
          <Input
            label={'Rua'}
            placeholder={'Informe o nome da rua'}
            errorMessage={form.formState.errors.street?.message}
            labelPlacement="outside"
            {...form.register('street')}
            isRequired
          />
        </fieldset>
        <fieldset>
          <Controller
            control={form.control}
            name="number"
            render={({ field }) => (
              <InputMask
                mask="_____"
                replacement={{ _: /\d/ }}
                component={Input}
                label={'Número'}
                placeholder={'Informe o número'}
                errorMessage={form.formState.errors.number?.message}
                labelPlacement="outside"
                isRequired
                {...field}
                value={String(field.value ?? '')}
                onValueChange={field.onChange}
              />
            )}
          />
        </fieldset>
        <fieldset>
          <Controller
            control={form.control}
            name="city"
            render={({ field }) => (
              <Input
                type="text"
                label={'Cidade'}
                placeholder={'Informe o nome da cidade'}
                errorMessage={form.formState.errors.city?.message}
                labelPlacement="outside"
                isRequired
                {...field}
                onValueChange={field.onChange}
              />
            )}
          />
        </fieldset>
        <fieldset>
          <SelectState form={form} />
        </fieldset>
        <fieldset>
          <Controller
            control={form.control}
            name="zip"
            render={({ field }) => (
              <InputMask
                mask="_____-___"
                replacement={{ _: /\d/ }}
                component={Input}
                label={'CEP'}
                placeholder={'Informe o CEP'}
                errorMessage={form.formState.errors.zip?.message}
                labelPlacement="outside"
                isRequired
                {...field}
                value={String(field.value ?? '')}
                onValueChange={field.onChange}
              />
            )}
          />
        </fieldset>
        <fieldset>
          <Controller
            control={form.control}
            name="complement"
            render={({ field }) => (
              <Input
                type="text"
                label={'Complemento'}
                placeholder={'Informe o complemento'}
                errorMessage={form.formState.errors.complement?.message}
                labelPlacement="outside"
                {...field}
                value={String(field.value ?? '')}
                onValueChange={field.onChange}
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
