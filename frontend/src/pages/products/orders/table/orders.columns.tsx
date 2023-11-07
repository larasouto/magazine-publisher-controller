import { Format } from '@/components/ui/label/Format'
import { Checkbox } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import { OrderStatus } from '../orders.schema'
import { OrdersActions } from './orders.actions'

export type OrdersColumns = {
  id: string
  totalValue: string
  status: string
}

const helper = createColumnHelper<OrdersColumns>()

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
   * ID
   */
  helper.display({
    id: 'id',
    header: 'ID',
    cell: ({ row }) => <span>{row.original.id}</span>
  }),
  /**
   * Total Value
   */
  helper.display({
    id: 'totalValue',
    header: 'Valor Total',
    cell: ({ row }) => <Format text={row.original.totalValue} type="price" />
  }),
  /**
   * Status
   */
  helper.display({
    id: 'status',
    header: 'Status',
    cell: ({ row }) => <span>{OrderStatus[row.original.status]}</span>
  }),
  /**
   * Actions
   */
  helper.display({
    id: 'actions',
    cell: ({ row }) => <OrdersActions row={row.original} />,
    enableSorting: false,
    enableHiding: false
  })
]
