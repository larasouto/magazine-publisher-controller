import { Checkbox } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import { BookstoreOrderReturnsActions } from './bookstoreOrderReturn.actions'

export type BookstoreOrderReturnsColumns = {
  id: string
  returnDate: Date
  returnNumber: number
  graphicsOrderId: string

}

const helper = createColumnHelper<BookstoreOrderReturnsColumns>()

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
   * graphicsOrderId
   */
  helper.accessor((row) => row.graphicsOrderId, {
    id: 'graphicsOrderId',
    header: () => t('graphics:form.graphicsOrderId.label'),
    cell: ({ row }) => row.getValue('graphicsOrderId'),
    enableSorting: true,
    enableHiding: true
  }),
    /**
   * returnNumber
   */
    helper.accessor((row) => row.returnNumber, {
      id: 'returnNumber',
      header: () => t('graphics:form.returnNumber.label'),
      cell: ({ row }) => row.getValue('returnNumber'),
      enableSorting: true,
      enableHiding: true
    }),
        /**
   * returnDate
   */
        helper.accessor((row) => row.returnDate, {
          id: 'returnDate',
          header: () => t('graphics:form.returnDate.label'),
          cell: ({ row }) => row.getValue('returnDate'),
          enableSorting: true,
          enableHiding: true
        }),
  /**
   * Actions
   */
  helper.display({
    id: 'actions',
    cell: ({ row }) => <BookstoreOrderReturnsActions row={row.original} />,
    enableSorting: false,
    enableHiding: false
  })
]
