import { GridLayout } from '@/components/ui/Grid'
import { PriceIcon } from '@/components/ui/icons/PriceIcon'
import { useFetch } from '@/hooks/useFetch'
import { backend, routes } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Chip, Input } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { ApproveButton } from '../../admin/components/ApproveButton'
import { RejectButton } from '../../admin/components/RejectButton'
import {
  AdvertisingCategory,
  AdvertisingData,
  AdvertisingDataWithId,
  AdvertisingSchema,
  AdvertisingStatus,
  AdvertisingType
} from '../advertisings.schema'
import { MagazinesSelect } from '../magazines/magazines-select'
import { AdvertisingsImageView } from './image/advertising.image'

type AdvertisingsFormProps = {
  data?: AdvertisingDataWithId
}

export const AdvertisingViewForm = ({ data }: AdvertisingsFormProps) => {
  const { create, update } = useFetch<AdvertisingData>({
    baseUrl: backend.advertisings.baseUrl,
    query: ['advertisings'],
    redirectTo: routes.advertisings.index,
    fetch: {
      id: data?.id
    }
  })

  const form = useForm<AdvertisingData>({
    mode: 'all',
    resolver: zodResolver(AdvertisingSchema),
    defaultValues: data
  })

  const onSubmit = async (form: AdvertisingData) => {
    if (data) {
      console.log('update', form)
      await update.mutateAsync(form)
      return
    }
    console.log('create', form)
    await create.mutateAsync(form)
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-3"
      noValidate
    >
      <GridLayout className="grid grid-cols-1 lg:grid-cols-[auto_1fr]">
        <AdvertisingsImageView form={form} />
        <GridLayout cols="3">
          <fieldset>
            <Input
              label={'Título'}
              placeholder={'Informe o título da propaganda'}
              errorMessage={form.formState.errors.title?.message}
              labelPlacement="outside"
              value={data?.title}
              isReadOnly
            />
          </fieldset>
          <fieldset>
            <Input
              label={'Descrição'}
              placeholder={'Informe a descrição da propaganda'}
              errorMessage={form.formState.errors.description?.message}
              labelPlacement="outside"
              value={data?.description ?? ''}
              isReadOnly
            />
          </fieldset>
          <fieldset>
            <Input
              label={'Tipo'}
              placeholder={'Selecione o tipo da propaganda'}
              labelPlacement="outside"
              value={AdvertisingType[data?.type ?? 1]}
              isReadOnly
            />
          </fieldset>
          <fieldset>
            <Input
              label={'Categoria'}
              placeholder={'Selecione a categoria da propaganda'}
              labelPlacement="outside"
              value={AdvertisingCategory[data?.category ?? 1]}
              isReadOnly
            />
          </fieldset>
          <fieldset>
            <Input
              type="number"
              startContent={<PriceIcon />}
              label={'Preço'}
              placeholder={'Informe o preço da propaganda'}
              labelPlacement="outside"
              value={String(data?.price ?? '0')}
              isReadOnly
            />
          </fieldset>
          <MagazinesSelect form={form} isView />
          <fieldset>
            <Input
              label={'Motivo'}
              placeholder={'Informe o motivo da recusa'}
              errorMessage={form.formState.errors.extraInfo?.message}
              labelPlacement="outside"
              value={data?.extraInfo ?? ''}
              isReadOnly
            />
          </fieldset>
          <fieldset>
            <Input
              className="hidden"
              label={'Imagem'}
              placeholder={'Informe a imagem da propaganda'}
              errorMessage={form.formState.errors.imagePath?.message}
              labelPlacement="outside"
              {...form.register('imagePath')}
            />
          </fieldset>
        </GridLayout>
      </GridLayout>
      {data?.status === 0 ? (
        <div className="flex gap-2">
          <ApproveButton id={data?.id} />
          <RejectButton id={data?.id} />
        </div>
      ) : (
        <Chip
          color={
            data?.status === AdvertisingStatus.APPROVED ? 'success' : 'danger'
          }
        >
          {data?.status === AdvertisingStatus.APPROVED
            ? 'Aprovado'
            : 'Rejeitado'}
        </Chip>
      )}
    </form>
  )
}
