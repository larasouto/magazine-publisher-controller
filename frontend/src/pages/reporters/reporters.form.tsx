import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/layout/Grid'
import { useReporter } from '@/hooks/useReporter'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { InputMask } from '@react-input/mask'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  ReporterForm,
  ReporterFormWithId,
  ReporterSchema,
  ReporterStatus
} from './reporters.schema'

type CategoriesFormProps = {
  data?: ReporterFormWithId
}

export const ReportersForm = ({ data }: CategoriesFormProps) => {
  const { t } = useTranslation('reporters')
  const { create, update } = useReporter()

  const form = useForm<ReporterForm>({
    mode: 'all',
    resolver: zodResolver(ReporterSchema),
    defaultValues: data
  })

  const onSubmit = async (form: ReporterForm) => {
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
            label={t('form.name.label')}
            placeholder={t('form.name.placeholder')}
            errorMessage={form.formState.errors.name?.message}
            labelPlacement="outside"
            {...form.register('name')}
            isRequired
            isClearable
          />
        </fieldset>
        <fieldset>
          <Input
            type="email"
            label={t('form.email.label')}
            placeholder={t('form.email.placeholder')}
            errorMessage={form.formState.errors.email?.message}
            labelPlacement="outside"
            {...form.register('email')}
            isRequired
            isClearable
          />
        </fieldset>
        <fieldset>
          <InputMask
            mask="(__) _.____-____"
            replacement={{ _: /\d/ }}
            component={Input}
            label={t('form.phone.label')}
            placeholder={t('form.phone.placeholder')}
            errorMessage={form.formState.errors.phone?.message}
            labelPlacement="outside"
            {...form.register('phone')}
            isClearable
          />
        </fieldset>
        <fieldset>
          <InputMask
            mask="___.___.___-__"
            replacement={{ _: /\d/ }}
            component={Input}
            label={t('form.cpf.label')}
            placeholder={t('form.cpf.placeholder')}
            errorMessage={form.formState.errors.cpf?.message}
            labelPlacement="outside"
            {...form.register('cpf')}
            isRequired
            isClearable
          />
        </fieldset>
        <fieldset>
          <Input
            label={t('form.specialty.label')}
            placeholder={t('form.specialty.placeholder')}
            errorMessage={form.formState.errors.specialty?.message}
            labelPlacement="outside"
            {...form.register('specialty')}
            isRequired
            isClearable
          />
        </fieldset>
        <fieldset>
          <Select
            label={t('form.status.label')}
            placeholder={t('form.status.placeholder')}
            labelPlacement="outside"
            defaultSelectedKeys={[data?.status ?? 'ACTIVE']}
            {...form.register('status')}
            isRequired
          >
            {Object.keys(ReporterStatus).map((key) => (
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
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                type="date"
                label={t('form.entry_date.label')}
                placeholder={t('form.entry_date.placeholder')}
                errorMessage={form.formState.errors.entryDate?.message}
                labelPlacement="outside"
                value={value?.toString().split('T')[0]}
                onChange={onChange}
                onBlur={onBlur}
                isRequired
                isClearable
              />
            )}
          />
        </fieldset>
        {data && (
          <fieldset>
            <Controller
              control={form.control}
              name="departureDate"
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  type="date"
                  label={t('form.departure_date.label')}
                  placeholder={t('form.departure_date.placeholder')}
                  errorMessage={form.formState.errors.departureDate?.message}
                  labelPlacement="outside"
                  value={value?.toString().split('T')[0]}
                  onChange={onChange}
                  onBlur={onBlur}
                  isRequired
                  isClearable
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
