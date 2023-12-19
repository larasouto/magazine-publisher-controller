import { useFetch } from '@/hooks/useFetch'
import { AddressesColumns } from '@/pages/users/addresses/table/addresses.columns'
import { backend, routes } from '@/routes/routes'
import { Link, Select, SelectItem, cn } from '@nextui-org/react'
import { UseFormReturn } from 'react-hook-form'
import { PaymentSubscriptionProps } from '../subscriptions.schema'

type AddressesSelectProps = {
  form: UseFormReturn<PaymentSubscriptionProps>
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
        description={
          list.data?.length === 0 && (
            <span>
              Não há endereços cadastrados.{' '}
              <Link
                href={routes.profile.addresses.new}
                target="_blank"
                className="text-xs hover:underline"
              >
                Cadastre um!
              </Link>
            </span>
          )
        }
        classNames={{
          label: cn({ 'pb-2': list.data?.length === 0 })
        }}
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
