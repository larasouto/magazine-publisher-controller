import { UseFormReturn } from "react-hook-form"
import { BookstoreOrderForm } from "../bookstoreOrder.schema"
import { useTranslation } from "react-i18next"
import { useFetch } from "@/hooks/useFetch"
import { EditionColumns } from "@/pages/editions/table/editions.columns"
import { backend } from "@/routes/routes"
import { Select, SelectItem } from "@nextui-org/react"

type EditionsSelectProps = {
  form: UseFormReturn<BookstoreOrderForm>
}

export const EditionsSelect = ({ form }: EditionsSelectProps) => {
  const { t } = useTranslation('bookstores')

  const { list } = useFetch<EditionColumns[]>({
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
          form.getValues('editionId') ? [form.getValues('editionId')] : undefined
        }
        isLoading={list.isLoading}
        disallowEmptySelection
        errorMessage={form.formState.errors.editionId?.message}
        isRequired
      >
        {(edition) => (
          <SelectItem key={edition.id} textValue={edition.number}>
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <span className="text-small">{edition.number}</span>
                <span className="text-tiny text-default-500">
                  {edition.number}
                </span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
    </fieldset>
  )
}
