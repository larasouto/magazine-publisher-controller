import { Checkbox } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import { GraphicsOrdersReturnsActions } from './graphicsOrderReturn.actions'

export type GraphicsOrdersReturnColumns = {
  id: string
  graphicsOrderId: string
  returnDate: Date
  returnNumber: number
}

const helper = createColumnHelper<GraphicsOrdersReturnColumns>()

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
   * id
   */
    helper.accessor((row) => row.id, {
      id: 'id',
      header: () => t('bookstores:form.id.label'),
      cell: ({ row }) => row.getValue('id'),
      enableSorting: true,
      enableHiding: true
    }),
  /**
   * graphicsOrderId
   */
  helper.accessor((row) => row.graphicsOrderId, {
    id: 'graphicsOrderId',
    header: () => t('bookstores:form.graphicsOrderId.label'),
    cell: ({ row }) => row.getValue('graphicsOrderId'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * returnDate
   */
  helper.accessor((row) => row.returnDate, {
    id: 'returnDate',
    header: () => t('bookstores:form.returnDate.label'),
    cell: ({ row }) => row.getValue('returnDate'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * returnNumber
   */
  helper.accessor((row) => row.returnNumber, {
    id: 'returnNumber',
    header: () => t('bookstores:form.ireturnNumberd.label'),
    cell: ({ row }) => row.getValue('returnNumber'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Actions
   */
  helper.display({
    id: 'actions',
    cell: ({ row }) => <GraphicsOrdersReturnsActions row={row.original} />,
    enableSorting: false,
    enableHiding: false
  })
]
