import { useFetch } from '@/hooks/useFetch'
import { MagazineColumns } from '@/pages/magazines/table/magazines.columns'
import { backend } from '@/routes/routes'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { Controller, UseFormReturn } from 'react-hook-form'
import { SubscriptionData } from '../subscriptions.schema'

type MagazinesSelectProps = {
  form: UseFormReturn<SubscriptionData>
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
      <Controller
        control={form.control}
        name={'magazineId'}
        render={({ field: { value, onChange, ...rest } }) => (
          <Autocomplete
            defaultItems={list.data ?? []}
            label={'Revista'}
            placeholder={'Selecione uma revista'}
            labelPlacement="outside"
            errorMessage={form.formState.errors.magazineId?.message}
            selectedKey={String(value)}
            onSelectionChange={(value) => onChange(String(value))}
            {...rest}
            isRequired
          >
            {(item) => (
              <AutocompleteItem key={item.id} textValue={item.name}>
                <div className="flex flex-col gap-1">
                  {item.name}
                  <span className="text-xs font-thin text=danger">
                    {item.description}
                  </span>
                </div>
              </AutocompleteItem>
            )}
          </Autocomplete>
        )}
      />
    </fieldset>
  )
}
