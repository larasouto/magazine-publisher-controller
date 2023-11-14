import { useFetch } from '@/hooks/useFetch'
import { MagazineColumns } from '@/pages/magazines/table/magazines.columns'
import { backend } from '@/routes/routes'
import { Input } from '@nextui-org/react'
import { UseFormReturn } from 'react-hook-form'
import { AdvertisingData } from '../advertisings.schema'

type MagazinesSelectProps = {
  form: UseFormReturn<AdvertisingData>
}

export const MagazinesSelect = ({ form }: MagazinesSelectProps) => {
  const { get } = useFetch<MagazineColumns>({
    baseUrl: backend.magazines.baseUrl,
    query: ['magazines'],
    fetch: {
      id: form.getValues('magazineId'),
      get: true
    }
  })

  return (
    <fieldset>
      <Input
        label={'Revista'}
        placeholder={'Selecione uma revista'}
        labelPlacement="outside"
        value={get.data?.name}
      />
    </fieldset>
  )
}
