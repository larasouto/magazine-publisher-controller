import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/ui/Grid'
import { DatePicker } from '@/components/ui/date-picker/DatePicker'
import { useFetch } from '@/hooks/useFetch'
import { backend } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { InputMask } from '@react-input/mask'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  PhotographerForm,
  PhotographerFormWithId,
  PhotographerSchema,
  PhotographerStatus
} from './photographers.schema'

type PhotographerFormProps = {
  data?: PhotographerFormWithId
}

export const PhotographersForm = ({ data }: PhotographerFormProps) => {
  const { t } = useTranslation('photographers')

  const { create, update } = useFetch<PhotographerForm>({
    baseUrl: backend.photographers.baseUrl,
    query: ['photographers'],
    fetch: {
      id: data?.id
    }
  })

  const form = useForm<PhotographerForm>({
    mode: 'all',
    resolver: zodResolver(PhotographerSchema),
    defaultValues: data
  })

  const onSubmit = async (form: PhotographerForm) => {
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
          <Controller
            control={form.control}
            name="name"
            render={({ field }) => (
              <Input
                label={t('form.name.label')}
                placeholder={t('form.name.placeholder')}
                errorMessage={form.formState.errors.name?.message}
                labelPlacement="outside"
                isRequired
                {...field}
                onValueChange={field.onChange}
              />
            )}
          />
        </fieldset>
        <fieldset>
          <Controller
            control={form.control}
            name="email"
            render={({ field }) => (
              <Input
                type="email"
                label={t('form.email.label')}
                placeholder={t('form.email.placeholder')}
                errorMessage={form.formState.errors.email?.message}
                labelPlacement="outside"
                {...field}
                onValueChange={field.onChange}
                isRequired
              />
            )}
          />
        </fieldset>
        <fieldset>
          <Controller
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <InputMask
                mask="___.___.___-__"
                replacement={{ _: /\d/ }}
                component={Input}
                label={t('form.cpf.label')}
                placeholder={t('form.cpf.placeholder')}
                errorMessage={form.formState.errors.cpf?.message}
                labelPlacement="outside"
                {...field}
                onValueChange={field.onChange}
                isRequired
              />
            )}
          />
        </fieldset>
        <fieldset>
          <Controller
            control={form.control}
            name="phone"
            render={({ field }) => (
              <InputMask
                mask="(__) _.____-____"
                replacement={{ _: /\d/ }}
                component={Input}
                label={t('form.phone.label')}
                placeholder={t('form.phone.placeholder')}
                errorMessage={form.formState.errors.phone?.message}
                labelPlacement="outside"
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
            name="specialty"
            render={({ field }) => (
              <Input
                label={t('form.specialty.label')}
                placeholder={t('form.specialty.placeholder')}
                errorMessage={form.formState.errors.specialty?.message}
                labelPlacement="outside"
                isRequired
                {...field}
                onValueChange={field.onChange}
              />
            )}
          />
        </fieldset>
        <fieldset>
          <Select
            label={t('form.status.label')}
            placeholder={t('form.status.placeholder')}
            labelPlacement="outside"
            defaultSelectedKeys={[data?.status ?? 'ACTIVE']}
            {...form.register('status')}
            disallowEmptySelection
            isRequired
          >
            {Object.keys(PhotographerStatus).map((key) => (
              <SelectItem key={key} value={key}>
                {t(`form.status.options.${key.toLowerCase()}`)}
              </SelectItem>
            ))}
          </Select>
        </fieldset>
        <fieldset>
          <Controller
            control={form.control}
            name="entryDate"
            render={({ field }) => (
              <DatePicker
                label={t('form.entry_date.label')}
                errorMessage={form.formState.errors.entryDate?.message}
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                shouldDisableAfterToday
                isRequired
              />
            )}
          />
        </fieldset>
        {data && (
          <fieldset>
            <Controller
              control={form.control}
              name="departureDate"
              render={({ field }) => (
                <DatePicker
                  label={t('form.departure_date.label')}
                  mode="single"
                  selected={field.value ?? undefined}
                  onSelect={field.onChange}
                  isRequired
                />
              )}
            />
          </fieldset>
        )}
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
