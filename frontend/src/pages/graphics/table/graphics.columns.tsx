import { Checkbox } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import { GraphicsActions } from './graphics.actions'

export type GraphicsColumns = {
  id: string
  address: string
  name: string
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
   * name
   */
  helper.accessor((row) => row.name, {
    id: 'name',
    header: () => t('Nome'),
    cell: ({ row }) => row.getValue('name'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * address
   */
  helper.accessor((row) => row.address, {
    id: 'address',
    header: () => t('Endereço'),
    cell: ({ row }) => row.getValue('address'),
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
