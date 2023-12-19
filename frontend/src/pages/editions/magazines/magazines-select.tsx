import { useFetch } from '@/hooks/useFetch'
import { MagazineFormWithId } from '@/pages/magazines/magazines.schema'
import { backend, routes } from '@/routes/routes'
import { Link, Select, SelectItem, cn } from '@nextui-org/react'
import { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { EditionForm } from '../editions.schema'

type ThemesSelectProps = {
  form: UseFormReturn<EditionForm>
}

export const MagazinesSelect = ({ form }: ThemesSelectProps) => {
  const { t } = useTranslation('editions')

  const { list } = useFetch<MagazineFormWithId[]>({
    baseUrl: backend.magazines.baseUrl,
    query: ['magazines'],
    fetch: {
      list: true
    }
  })

  if (list.isLoading) {
    return null
  }

  return (
    <fieldset>
      <Select
        items={list?.data ?? []}
        label={t('form.magazine.label')}
        placeholder={t('form.magazine.placeholder')}
        labelPlacement="outside"
        {...form.register('magazineId')}
        defaultSelectedKeys={
          form.getValues('magazineId')
            ? [form.getValues('magazineId')]
            : undefined
        }
        isLoading={list.isLoading}
        disallowEmptySelection
        errorMessage={form.formState.errors.magazineId?.message}
        description={
          list.data?.length === 0 && (
            <span>
              Não há revistas cadastradas.{' '}
              <Link
                href={routes.magazines.new}
                target="_blank"
                className="text-xs hover:underline"
              >
                Cadastre uma!
              </Link>
            </span>
          )
        }
        classNames={{
          label: cn({ 'pb-2': list.data?.length === 0 })
        }}
        isRequired
      >
        {(magazine) => (
          <SelectItem key={magazine.id} textValue={magazine.name}>
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <span className="text-small">{magazine.name}</span>
                <span className="text-tiny text-default-500">
                  {magazine.description}
                </span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
    </fieldset>
  )
}
