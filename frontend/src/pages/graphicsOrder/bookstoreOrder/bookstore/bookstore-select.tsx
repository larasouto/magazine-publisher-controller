import { UseFormReturn } from "react-hook-form"
import { BookstoreOrderForm } from "../bookstoreOrder.schema"
import { useTranslation } from "react-i18next"
import { useFetch } from "@/hooks/useFetch"
import { backend } from "@/routes/routes"
import { Select, SelectItem } from "@nextui-org/react"
import { BookstoresColumns } from "@/pages/bookstore/table/bookstores.columns"

type BookstoreSelectProps = {
  form: UseFormReturn<BookstoreOrderForm>
}

export const BookstoreSelect = ({ form }: BookstoreSelectProps) => {
  const { t } = useTranslation('bookstores')

  const { list } = useFetch<BookstoresColumns[]>({
    baseUrl: backend.bookstores.baseUrl,
    query: ['bookstores'],
    fetch: {
      list: true
    }
  })

  return (
    <fieldset>
      <Select
        items={list?.data ?? []}
        label={t('form.bookstore.label')}
        placeholder={t('form.bookstore.placeholder')}
        labelPlacement="outside"
        {...form.register('bookstoreId')}
        defaultSelectedKeys={
          form.getValues('bookstoreId') ? [form.getValues('bookstoreId')] : undefined
        }
        isLoading={list.isLoading}
        disallowEmptySelection
        errorMessage={form.formState.errors.bookstoreId?.message}
        isRequired
      >
        {(bookstore) => (
          <SelectItem key={bookstore.name} textValue={bookstore.name}>
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <span className="text-small">{bookstore.name}</span>
                <span className="text-tiny text-default-500">
                  {bookstore.name}
                </span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
    </fieldset>
  )
}
