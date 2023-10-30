import { GridLayout } from '@/components/ui/Grid'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input, ModalBody, ModalHeader } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { AddressesDataWithId, AddressesSchema } from './addresses.schema'

type AddressesFormProps = {
  data?: AddressesDataWithId
}

export const AddressesForm = ({ data }: AddressesFormProps) => {
  const { t } = useTranslation('addresses')

  const form = useForm({
    mode: 'all',
    resolver: zodResolver(AddressesSchema),
    defaultValues: data
  })

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        <h3 className="text-2xl">Cadastrar Endereço</h3>
      </ModalHeader>
      <ModalBody>
        <form>
          <GridLayout cols="2">
            <fieldset>
              <Input
                type="email"
                label={t('form.email.label')}
                placeholder={t('form.email.placeholder')}
                errorMessage={form.formState.errors.holder?.message}
                labelPlacement="outside"
                {...form.register('holder')}
                isRequired
              />
            </fieldset>
            <fieldset>
              <InputMask
                mask="(__) _.____-____"
                replacement={{ _: /\d/ }}
                component={Input}
                label={t('form.phone.label')}
                placeholder={t('form.phone.placeholder')}
                errorMessage={form.formState.errors.phone?.message}
                labelPlacement="outside"
                {...form.register('phone')}
              />
            </fieldset>
          </GridLayout>
        </form>
      </ModalBody>
    </>
  )
}
