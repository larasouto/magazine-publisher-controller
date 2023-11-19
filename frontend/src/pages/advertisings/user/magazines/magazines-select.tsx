import { useFetch } from '@/hooks/useFetch'
import { MagazineColumns } from '@/pages/magazines/table/magazines.columns'
import { backend } from '@/routes/routes'
import { Select, SelectItem } from '@nextui-org/react'
import { UseFormReturn } from 'react-hook-form'
import { AdvertisingData } from '../advertisings.schema'

type MagazinesSelectProps = {
  form: UseFormReturn<AdvertisingData>
}

export const MagazinesSelect = ({ form }: MagazinesSelectProps) => {
  const { list } = useFetch<MagazineColumns[]>({
    baseUrl: backend.magazines.baseUrl,
    query: ['magazines'],
    fetch: {
      list: true
    }
  })

  return (
    <fieldset>
      <Select
        items={list?.data ?? []}
        label={'Revista'}
        placeholder={'Selecione uma revista'}
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
