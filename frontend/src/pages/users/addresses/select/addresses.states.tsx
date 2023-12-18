import { Combobox } from '@/components/ui/combobox/Combobox'
import { api } from '@/services/api'
import { Controller, UseFormReturn } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useQuery } from 'react-query'
import { AddressesDataWithId } from '../addresses.schema'

type SelectAddressStateProps = {
  form: UseFormReturn<AddressesDataWithId>
}

type States = {
  sigla: string
  nome: string
}

export const SelectState = ({ form }: SelectAddressStateProps) => {
  const { t } = useTranslation('addresses')

  const states = useQuery<States[]>(
    'UF',
    async () => {
      return await api
        .get(
          'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
        )
        .then((res) => res.data)
    },
    {
      staleTime: 1000 * 3600 * 24 * 7, // 7 days
      cacheTime: 1000 * 3600 * 24 * 7, // 7 days
      refetchOnWindowFocus: false
    }
  )

  return (
    <Controller
      control={form.control}
      name="state"
      render={({ field }) => (
        <Combobox
          field={field}
          label={t('form.state.label')}
          placeholder={t('form.state.placeholder')}
          errorMessage={form.formState.errors.state?.message}
          isLoading={states.isLoading}
          items={
            states?.data?.map((state) => ({
              key: state.sigla,
              value: `${state.nome} - ${state.sigla}`
            })) ?? []
          }
          isRequired
        />
      )}
    />
  )
}
