import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/ui/Grid'
import { useFetch } from '@/hooks/useFetch'
import { backend, routes } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  AdvertisingCategory,
  AdvertisingData,
  AdvertisingDataWithId,
  AdvertisingSchema,
  AdvertisingType
} from './advertisings.schema'
import { AdvertisingsImage } from './image/advertising.image'
import { MagazinesSelect } from './magazines/magazines-select'

type AdvertisingsFormProps = {
  data?: AdvertisingDataWithId
}

export const AdvertisingForm = ({ data }: AdvertisingsFormProps) => {
  const { t } = useTranslation('advertisings')

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

  const category = {
    BEGINNING: {
      label: 'Começo',
      color: 'primary'
    },
    MIDDLE: {
      label: 'Meio',
      color: 'default'
    },
    END: {
      label: 'Fim',
      color: 'warning'
    }
  }

  const type = {
    BANNER: {
      label: 'Banner',
      color: 'primary'
    },
    WHOLE_PAGE: {
      label: 'Página inteira',
      color: 'default'
    },
    DOUBLE_PAGE: {
      label: 'Página dupla',
      color: 'secondary'
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-3"
      noValidate
    >
      <GridLayout className="grid grid-cols-1 lg:grid-cols-[auto_1fr]">
        <AdvertisingsImage
          form={form}
          errorMessage={form.formState.errors.imagePath?.message}
        />
        <GridLayout cols="3">
          <fieldset>
            <Input
              label={'Título'}
              placeholder={'Informe o título da propaganda'}
              errorMessage={form.formState.errors.title?.message}
              labelPlacement="outside"
              {...form.register('title')}
              isRequired
            />
          </fieldset>
          <fieldset>
            <Input
              label={'Descrição'}
              placeholder={'Informe a descrição da propaganda'}
              errorMessage={form.formState.errors.description?.message}
              labelPlacement="outside"
              {...form.register('description')}
            />
          </fieldset>
          <fieldset>
            <Select
              label={'Tipo'}
              placeholder={'Selecione o tipo da propaganda'}
              labelPlacement="outside"
              defaultSelectedKeys={[String(data?.type ?? 1)]}
              {...form.register('type')}
              errorMessage={form.formState.errors.type?.message}
              disallowEmptySelection
              isRequired
            >
              {Object.values(AdvertisingType)
                .filter((value) => !isNaN(+value))
                .map((value) => (
                  <SelectItem key={value} value={value}>
                    {type[AdvertisingType[value]].label}
                  </SelectItem>
                ))}
            </Select>
          </fieldset>
          <fieldset>
            <Select
              label={'Categoria'}
              placeholder={'Selecione a categoria da propaganda'}
              labelPlacement="outside"
              defaultSelectedKeys={[String(data?.type ?? 1)]}
              {...form.register('category')}
              errorMessage={form.formState.errors.category?.message}
              disallowEmptySelection
              isRequired
            >
              {Object.values(AdvertisingCategory)
                .filter((value) => !isNaN(+value))
                .map((value) => (
                  <SelectItem key={value} value={value}>
                    {category[AdvertisingCategory[value]].label}
                  </SelectItem>
                ))}
            </Select>
          </fieldset>
          <MagazinesSelect form={form} />
          <fieldset>
            <Input
              className="hidden"
              label={'Imagem'}
              placeholder={'Informe a imagem da propaganda'}
              errorMessage={form.formState.errors.imagePath?.message}
              labelPlacement="outside"
              {...form.register('imagePath')}
              isRequired
            />
          </fieldset>
        </GridLayout>
      </GridLayout>
      <SubmitButton
        isEdit={!!data}
        fnResetButton={form.reset}
        isLoading={create.isLoading || update.isLoading}
      >
        {data ? t('common:btn.edit') : t('common:btn.save')}
      </SubmitButton>
    </form>
  )
}
