import { Checkbox } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import { BookstoresActions } from './bookstores.actions'

export type BookstoresColumns = {
  id: string
  address: string
}

const helper = createColumnHelper<BookstoresColumns>()

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
   * address
   */
  helper.accessor((row) => row.address, {
    id: 'address',
    header: () => t('bookstores:form.address.label'),
    cell: ({ row }) => row.getValue('address'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Actions
   */
  helper.display({
    id: 'actions',
    cell: ({ row }) => <BookstoresActions row={row.original} />,
    enableSorting: false,
    enableHiding: false
  })
]
