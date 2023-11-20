import { Checkbox } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import { Status } from '../graphicsOrders.schema'
import { GraphicsOrdersActions } from './graphicsOrders.actions'


export type GraphicsOrdersColumns = {
  id: string
  exampleNumber: number
  status: Status
  editionId: string
  bookstoreId: string
  graphicsDistributorId: string
}

const helper = createColumnHelper<GraphicsOrdersColumns>()

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
  /**
   * address
   */
  helper.accessor((row) => row.id, {
    id: 'id',
    header: () => t('bookstores:form.id.label'),
    cell: ({ row }) => row.getValue('id'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Actions
   */
  helper.display({
    id: 'actions',
    cell: ({ row }) => <GraphicsOrdersActions row={row.original} />,
    enableSorting: false,
    enableHiding: false
  })
]