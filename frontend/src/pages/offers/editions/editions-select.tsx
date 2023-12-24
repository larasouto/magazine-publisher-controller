import { useFetch } from '@/hooks/useFetch'
import { EditionColumns } from '@/pages/editions/table/editions.columns'
import { backend, routes } from '@/routes/routes'
import { Link, Select, SelectItem, cn } from '@nextui-org/react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { OfferForm } from '../offers.schema'

type EditionsSelectProps = {
  form: UseFormReturn<OfferForm>
}

export const EditionsSelect = ({ form }: EditionsSelectProps) => {
  const { list } = useFetch<EditionColumns[]>({
    baseUrl: backend.editions.baseUrl,
    query: ['editions'],
    fetch: {
      list: true
    }
  })

  return (
    <fieldset>
      <Controller
        control={form.control}
        name="editions"
        render={({ field: { onChange, ...rest } }) => (
          <Select
            items={list?.data ?? []}
            label={'Edições'}
            placeholder={'Selecione uma ou mais edições'}
            labelPlacement="outside"
            //defaultSelectedKeys={value}
            onSelectionChange={(keys) => {
              onChange(Array.from(keys))
            }}
            isLoading={list.isLoading}
            selectionMode="multiple"
            disallowEmptySelection
            errorMessage={form.formState.errors.editions?.message}
            isRequired
            {...rest}
            value={String(rest.value ?? '')}
            description={
              list.data?.length === 0 && (
                <span>
                  Não há edições cadastradas.{' '}
                  <Link
                    href={routes.editions.new}
                    target="_blank"
                    className="text-xs hover:underline"
                  >
                    Cadastre uma!
                  </Link>
                </span>
              )
            }
            classNames={{
              label: cn({ 'pb-2': list.data?.length === 0 })
            }}
          >
            {(edition) => (
              <SelectItem key={edition.id} textValue={edition.title}>
                <div className="flex gap-2 items-center">
                  <div className="flex flex-col">
                    <span className="text-small">{edition.title}</span>
                    <span className="text-tiny text-default-500">
                      {edition.price}
                    </span>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
        )}
      />
    </fieldset>
  )
}
