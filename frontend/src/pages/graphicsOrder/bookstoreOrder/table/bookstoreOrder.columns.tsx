import { Checkbox } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import { BookstoreOrdersActions } from './bookstoreOrder.actions'
import { Status } from '../bookstoreOrder.schema'

export type BookstoreOrdersColumns = {
  id: string
  exampleNumber: number
  status: Status
  editionId: string
  bookstoreId: string
  graphicsDistributorId: string
}

const helper = createColumnHelper<BookstoreOrdersColumns>()

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
    cell: ({ row }) => <BookstoreOrdersActions row={row.original} />,
    enableSorting: false,
    enableHiding: false
  })
]
