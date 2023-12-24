import { useFetch } from '@/hooks/useFetch'
import { CardType } from '@/pages/users/cards/cards.schema'
import { CardsColumns } from '@/pages/users/cards/table/cards.columns'
import { backend, routes } from '@/routes/routes'
import { Link, Select, SelectItem, cn } from '@nextui-org/react'
import { UseFormReturn } from 'react-hook-form'
import { OrdersData } from '../orders.schema'

type AddressSelectProps = {
  form: UseFormReturn<OrdersData>
}

export const CardsSelect = ({ form }: AddressSelectProps) => {
  const { list } = useFetch<CardsColumns[]>({
    baseUrl: backend.profile.cards.baseUrl,
    query: ['cards'],
    fetch: {
      list: true
    }
  })

  return (
    <fieldset>
      <Select
        label={'Cartão de crédito'}
        placeholder={'Selecione um cartão de crédito'}
        labelPlacement="outside"
        {...form.register('cardId')}
        defaultSelectedKeys={
          form.getValues('cardId') ? [form.getValues('cardId')] : undefined
        }
        isLoading={list.isLoading}
        disallowEmptySelection
        errorMessage={form.formState.errors.cardId?.message}
        isRequired
        description={
          list.data?.length === 0 && (
            <span>
              Não há cartão de crédito cadastrado.{' '}
              <Link
                href={routes.profile.cards.new}
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
          list?.data?.map((card) => (
            <SelectItem
              key={card.id}
              textValue={`${card.holder} - ${
                card?.number.slice(0, 4) +
                ' **** **** ' +
                card?.number.slice(-4)
              }`}
            >
              <div className="flex gap-2 items-center">
                <div className="flex flex-col">
                  <span className="text-small">{card.holder}</span>
                  <span className="text-tiny text-default-500">
                    {card.billingAddress} -{' '}
                    <span className="text-primary">
                      {card?.number.slice(0, 4) +
                        ' **** **** ' +
                        card?.number.slice(-4)}{' '}
                    </span>
                    ({CardType[card.type]})
                  </span>
                </div>
              </div>
            </SelectItem>
          ))
        ) : (
          <SelectItem
            key={0}
            textValue={'Nenhum cartão cadastrado'}
            isReadOnly
          />
        )}
      </Select>
    </fieldset>
  )
}
