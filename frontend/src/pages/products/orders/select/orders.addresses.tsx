import { useFetch } from '@/hooks/useFetch'
import { AddressesColumns } from '@/pages/users/addresses/table/addresses.columns'
import { backend } from '@/routes/routes'
import { Select, SelectItem } from '@nextui-org/react'
import { UseFormReturn } from 'react-hook-form'
import { OrdersData } from '../orders.schema'

type AddressesSelectProps = {
  form: UseFormReturn<OrdersData>
}

export const AddressesSelect = ({ form }: AddressesSelectProps) => {
  const { list } = useFetch<AddressesColumns[]>({
    baseUrl: backend.profile.addresses.baseUrl,
    query: ['addresses'],
    fetch: {
      list: true
    }
  })

  return (
    <fieldset>
      <Select
        label={'Endereço'}
        placeholder={'Selecione um endereço de entrega'}
        labelPlacement="outside"
        {...form.register('addressId')}
        defaultSelectedKeys={
          form.getValues('addressId')
            ? [form.getValues('addressId')]
            : undefined
        }
        isLoading={list.isLoading}
        disallowEmptySelection
        errorMessage={form.formState.errors.addressId?.message}
        isRequired
      >
        {list.data ? (
          list.data.map((address) => (
            <SelectItem
              key={address.id}
              textValue={`${address.street}, ${address.number}`}
            >
              <div className="flex gap-2 items-center">
                <div className="flex flex-col">
                  <span className="text-small">{`${address.street}, ${address.number}`}</span>
                  <span className="text-tiny text-default-500">
                    {address.city} - {address.state} - {address.zip}
                  </span>
                </div>
              </div>
            </SelectItem>
          ))
        ) : (
          <SelectItem
            key={0}
            textValue={'Nenhum endereço cadastrado'}
            isReadOnly
          />
        )}
      </Select>
    </fieldset>
  )
}
