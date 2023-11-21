import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/ui/Grid'
import { useFetch } from '@/hooks/useFetch'
import { backend, routes } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { InputMask } from '@react-input/mask'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { CardData, CardDataWithId, CardSchema, CardType } from './cards.schema'
import { useTabs } from '../context/address.context'

type CardsFormProps = {
  data?: CardDataWithId
}

export const CardsForm = ({ data }: CardsFormProps) => {
  const { setSelected } = useTabs()

  const form = useForm({
    mode: 'all',
    resolver: zodResolver(CardSchema),
    defaultValues: data
  })

  const { create, update } = useFetch<CardData>({
    baseUrl: backend.profile.cards.baseUrl,
    query: ['cards'],
    fetch: {
      id: data?.id
    },
    redirectTo: routes.profile.cards.index
  })

  const onSubmit = async (form: CardDataWithId) => {
    if (data) {
      await update.mutateAsync(form)
      setSelected('list')
      return
    }
    await create.mutateAsync(form)
    setSelected('list')
  }

  const typeCard = useMemo(() => {
    return {
      CREDIT: 'Crédito',
      DEBIT: 'Débito'
    }
  }, [])

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
    >
      <GridLayout cols="2">
        <fieldset>
          <Input
            type="text"
            label={'Nome do titular'}
            placeholder={'Carlos Eduardo da Silva'}
            errorMessage={form.formState.errors.holder?.message}
            labelPlacement="outside"
            {...form.register('holder')}
            isRequired
          />
        </fieldset>
        <fieldset>
          <InputMask
            mask="____ ____ ____ ____"
            replacement={{ _: /\d/ }}
            component={Input}
            label={'Número do cartão'}
            placeholder={'1234 5678 9101 1121'}
            errorMessage={form.formState.errors.number?.message}
            labelPlacement="outside"
            {...form.register('number')}
          />
        </fieldset>
        <fieldset>
          <InputMask
            mask="__/____"
            replacement={{ _: /\d/ }}
            component={Input}
            label={'Data de expiração'}
            placeholder={'MM/AAAA'}
            errorMessage={form.formState.errors.expirationDate?.message}
            labelPlacement="outside"
            {...form.register('expirationDate')}
          />
        </fieldset>
        <fieldset>
          <InputMask
            mask="___"
            replacement={{ _: /\d/ }}
            component={Input}
            label={'Código de Segurança (CVV)'}
            placeholder={'123'}
            errorMessage={form.formState.errors.securityCode?.message}
            labelPlacement="outside"
            {...form.register('securityCode')}
          />
        </fieldset>
        <fieldset>
          <Input
            type="text"
            label={'Endereço de cobrança'}
            placeholder={'Rua das Flores, 123'}
            errorMessage={form.formState.errors.billingAddress?.message}
            labelPlacement="outside"
            {...form.register('billingAddress')}
            isRequired
          />
        </fieldset>
        <fieldset>
          <InputMask
            mask="(__) _.____-____"
            replacement={{ _: /\d/ }}
            component={Input}
            label={'Telefone'}
            placeholder={'(11) 9.1234-5678'}
            errorMessage={form.formState.errors.phone?.message}
            labelPlacement="outside"
            {...form.register('phone')}
          />
        </fieldset>
        <fieldset>
          <Select
            label={'Tipo de cartão'}
            placeholder={'Selecione o tipo de cartão'}
            labelPlacement="outside"
            defaultSelectedKeys={[String(data?.type ?? 1)]}
            {...form.register('type')}
            errorMessage={form.formState.errors.type?.message}
            disallowEmptySelection
            isRequired
          >
            {Object.values(CardType)
              .filter((value) => !isNaN(+value))
              .map((value) => (
                <SelectItem key={value} value={value}>
                  {`${typeCard[CardType[value]]}`}
                </SelectItem>
              ))}
          </Select>
        </fieldset>
        <fieldset>
          <Select
            label={'Bandeira'}
            items={[
              { id: 'visa', label: 'Visa' },
              { id: 'mastercard', label: 'Mastercard' },
              { id: 'elo', label: 'Elo' },
              { id: 'hipercard', label: 'Hipercard' },
              { id: 'american_express', label: 'American Express' }
            ]}
            placeholder={'Selecione a bandeira do cartão'}
            labelPlacement="outside"
            defaultSelectedKeys={[String(data?.flag) ?? 1]}
            {...form.register('flag')}
            errorMessage={form.formState.errors.flag?.message}
            disallowEmptySelection
            isRequired
          >
            {(value) => (
              <SelectItem key={value.id} value={value.label}>
                {value.label}
              </SelectItem>
            )}
          </Select>
        </fieldset>
      </GridLayout>
      <SubmitButton isEdit={!!data} fnResetButton={form.reset}>
        {data ? 'Editar' : 'Salvar'}
      </SubmitButton>
    </form>
  )
}
