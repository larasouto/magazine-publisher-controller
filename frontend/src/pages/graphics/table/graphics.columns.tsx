import { Checkbox } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import { GraphicsActions } from './graphics.actions'

export type GraphicsColumns = {
  id: string
  name: string
  street: string
  number: string
  complement?: string
  city: string
  state: string
}

const helper = createColumnHelper<GraphicsColumns>()

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
   * Street
   */
  helper.accessor((row) => row.street, {
    id: 'street',
    header: () => 'Rua',
    cell: ({ row }) => row.getValue('street'),
    enableSorting: true,
    enableHiding: true
  }),
    /**
   * City
   */
    helper.accessor((row) => row.city, {
      id: 'city',
      header: () => 'Cidade',
      cell: ({ row }) => row.getValue('city'),
      enableSorting: true,
      enableHiding: true
    }),
      /**
   * Street
   */
  helper.accessor((row) => row.street, {
    id: 'street',
    header: () => 'Rua',
    cell: ({ row }) => row.getValue('street'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * State
   */
  helper.accessor((row) => row.state, {
    id: 'state',
    header: () => 'Estado',
    cell: ({ row }) => row.getValue('state'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Actions
   */
  helper.display({
    id: 'actions',
    cell: ({ row }) => <GraphicsActions row={row.original} />,
    enableSorting: false,
    enableHiding: false
  })
]
