import { UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useFetch } from '@/hooks/useFetch'
import { backend } from '@/routes/routes'
import { Select, SelectItem } from '@nextui-org/react'
import { EditionFormWithId } from '@/pages/editions/editions.schema'
import { GraphicsOrderForm } from '../graphicsOrders.schema'

type EditionsSelectProps = {
  form: UseFormReturn<GraphicsOrderForm>
}

export const EditionsSelect = ({ form }: EditionsSelectProps) => {
  const { t } = useTranslation('editions')

  const { list } = useFetch<EditionFormWithId[]>({
    baseUrl: backend.editions.baseUrl,
    query: ['editions'],
    fetch: {
      list: true
    }
  })

  return (
    <fieldset>
      <Select
        items={list?.data ?? []}
        label={t('form.edition.label')}
        placeholder={t('form.edition.placeholder')}
        labelPlacement="outside"
        {...form.register('editionId')}
        defaultSelectedKeys={
          form.getValues('editionId')
            ? [form.getValues('editionId')]
            : undefined
        }
        isLoading={list.isLoading}
        disallowEmptySelection
        errorMessage={form.formState.errors.editionId?.message}
        isRequired
      >
        {(edition) => (
          <SelectItem key={edition.id} textValue={edition.title}>
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <span className="text-small">{edition.title}</span>
                <span className="text-tiny text-default-500">
                  {edition.title}
                </span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
    </fieldset>
  )
}
