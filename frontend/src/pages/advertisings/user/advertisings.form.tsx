import { SubmitButton } from '@/components/SubmitButton'
import { GridLayout } from '@/components/ui/Grid'
import { useFetch } from '@/hooks/useFetch'
import { backend, routes } from '@/routes/routes'
import { api } from '@/services/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
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
  const [total, setTotal] = useState(0)

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
      color: 'primary',
      original: 'BANNER'
    },
    WHOLE_PAGE: {
      label: 'Página inteira',
      color: 'default',
      original: 'WHOLE_PAGE'
    },
    DOUBLE_PAGE: {
      label: 'Página dupla',
      color: 'secondary',
      original: 'DOUBLE_PAGE'
    }
  }

  const handleTotal = useCallback(
    async (value: string) => {
      await api.get(`/ad-prices/${value}`).then((res) => {
        const data = res.data.dto

        const typePrices = {
          [AdvertisingType.BANNER]: data.bannerPrice,
          [AdvertisingType.WHOLE_PAGE]: data.wholePagePrice,
          [AdvertisingType.DOUBLE_PAGE]: data.doublePagePrice
        }

        const categoryPrices = {
          [AdvertisingCategory.BEGINNING]: data.beginningPrice,
          [AdvertisingCategory.MIDDLE]: data.middlePrice,
          [AdvertisingCategory.END]: data.endPrice
        }

        const type = typePrices[form.watch('type')] || 0
        const price = categoryPrices[form.watch('category')] || 0
        const total = price + type

        setTotal(total)
        form.setValue('price', total)
      })
    },
    [form]
  )

  useEffect(() => {
    if (data) {
      handleTotal(data.magazineId)
    }
  }, [data, handleTotal])

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-3"
      noValidate
    >
      <GridLayout cols="1">
        <AdvertisingsImage
          form={form}
          errorMessage={form.formState.errors.imagePath?.message}
        />
      </GridLayout>
      <GridLayout cols="3">
        <fieldset>
          <Controller
            name="title"
            control={form.control}
            render={({ field }) => (
              <Input
                label={'Título'}
                placeholder={'Informe o título da propaganda'}
                errorMessage={form.formState.errors.title?.message}
                labelPlacement="outside"
                isRequired
                {...field}
                onValueChange={field.onChange}
              />
            )}
          />
        </fieldset>
        <fieldset>
          <Controller
            name="title"
            control={form.control}
            render={({ field }) => (
              <Input
                label={'Descrição'}
                placeholder={'Informe a descrição da propaganda'}
                errorMessage={form.formState.errors.description?.message}
                labelPlacement="outside"
                {...field}
                onValueChange={field.onChange}
              />
            )}
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
            onSelectionChange={async () => {
              await handleTotal(form.getValues('magazineId'))
            }}
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
            onSelectionChange={async () => {
              await handleTotal(form.getValues('magazineId'))
            }}
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
        <MagazinesSelect form={form} total={total} handleTotal={handleTotal} />
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
