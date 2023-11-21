import { useFetch } from '@/hooks/useFetch'
import { CategoryColumns } from '@/pages/categories/table/categories.columns'
import { backend } from '@/routes/routes'
import { Select, SelectItem } from '@nextui-org/react'
import { UseFormReturn } from 'react-hook-form'
import { ArticleData } from '../articles.schema'

type CategoriesSelectProps = {
  form: UseFormReturn<ArticleData>
}

export const CategoriesSelect = ({ form }: CategoriesSelectProps) => {
  const { list } = useFetch<CategoryColumns[]>({
    baseUrl: backend.categories.baseUrl,
    query: ['categories'],
    fetch: {
      list: true
    }
  })

  return (
    <fieldset>
      <Select
        items={list?.data ?? []}
        label={'Categoria'}
        placeholder={'Selecione uma categoria'}
        labelPlacement="outside"
        {...form.register('categoryId')}
        defaultSelectedKeys={
          form.getValues('categoryId')
            ? [form.getValues('categoryId')]
            : undefined
        }
        isLoading={list.isLoading}
        disallowEmptySelection
        errorMessage={form.formState.errors.categoryId?.message}
        isRequired
      >
        {(category) => (
          <SelectItem key={category.id} textValue={category.name}>
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <span className="text-small">{category.name}</span>
                <span className="text-tiny text-default-500">
                  {category.description}
                </span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
    </fieldset>
  )
}
