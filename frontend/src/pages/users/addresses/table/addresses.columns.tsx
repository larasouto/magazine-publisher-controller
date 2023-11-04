import { Checkbox } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import { AddressesActions } from './addresses.actions'

export type AddressesColumns = {
  id: string
  street: string
  number: string
  city: string
  state: string
  zip: string
  complement: string
}

const helper = createColumnHelper<AddressesColumns>()

export const columns = [
  /**
   * Select
   */
  helper.display({
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        isIndeterminate={table.getIsSomeRowsSelected()}
        onValueChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label={t('select_all')}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        isSelected={row.getIsSelected()}
        onValueChange={(value) => row.toggleSelected(!!value)}
        aria-label={t('select_row')}
      />
    ),
    enableSorting: false,
    enableHiding: false
  }),
  /**
   * Name
   */
  helper.accessor((row) => row.street, {
    id: 'street',
    header: () => t('reporters:form.street.label'),
    cell: ({ row }) => row.getValue('street') as string,
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Actions
   */
  helper.display({
    id: 'actions',
    cell: ({ row }) => <AddressesActions row={row.original} />,
    enableSorting: false,
    enableHiding: false
  })
]
