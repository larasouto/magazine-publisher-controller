import { useFetch } from '@/hooks/useFetch'
import { CardType } from '@/pages/users/cards/cards.schema'
import { CardsColumns } from '@/pages/users/cards/table/cards.columns'
import { backend } from '@/routes/routes'
import { Select, SelectItem } from '@nextui-org/react'
import { UseFormReturn } from 'react-hook-form'
import { PaymentAdvertisingProps } from '../advertisings.schema'

type AddressSelectProps = {
  form: UseFormReturn<PaymentAdvertisingProps>
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
      >
        {list.data ? (
          list?.data?.map((card) => (
            <SelectItem
              key={card.id}
              textValue={`${card.holder} - ${card.number}`}
            >
              <div className="flex gap-2 items-center">
                <div className="flex flex-col">
                  <span className="text-small">
                    {card.holder} - {CardType[card.type]}
                  </span>
                  <span className="text-tiny text-default-500">
                    {card.number} - {card.billingAddress}
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
