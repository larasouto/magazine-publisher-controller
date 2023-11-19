import { Format } from '@/components/ui/label/Format'
import { useFetch } from '@/hooks/useFetch'
import { cn } from '@/lib/utils'
import { MagazineColumns } from '@/pages/magazines/table/magazines.columns'
import { backend } from '@/routes/routes'
import { api } from '@/services/api'
import { Chip, Select, SelectItem } from '@nextui-org/react'
import { useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { AdvertisingData } from '../advertisings.schema'

type MagazinesSelectProps = {
  form: UseFormReturn<AdvertisingData>
  isView?: boolean
}

export const MagazinesSelect = ({ form, isView }: MagazinesSelectProps) => {
  const [total, setTotal] = useState(0)

  const { list } = useFetch<MagazineColumns[]>({
    baseUrl: backend.magazines.baseUrl,
    query: ['magazines'],
    fetch: {
      list: true
    }
  })

  const handleTotal = async (value: string) => {
    await api.get(`/ad-prices/${value}`).then((res) => {
      const data = res.data.dto
      const total =
        data.bannerPrice +
        data.wholePagePrice +
        data.doublePagePrice +
        data.beginningPrice +
        data.middlePrice +
        data.endPrice

      setTotal(total)
      form.setValue('price', total)
    })
  }

  return (
    <fieldset className="flex flex-col gap-3">
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
        onSelectionChange={async (value) => await handleTotal(value as string)}
        isLoading={list.isLoading}
        disallowEmptySelection
        errorMessage={form.formState.errors.magazineId?.message}
        classNames={{
          trigger: cn({ 'data-[disabled=true]:bg-default-300': isView })
        }}
        isRequired={!isView}
        isDisabled={isView}
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
      <Chip color="danger">
        <Format
          text={String(total)}
          type="price"
          noPadding
          appendStart="Valor Total: "
        />
      </Chip>
    </fieldset>
  )
}
