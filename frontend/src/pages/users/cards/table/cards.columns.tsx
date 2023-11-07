import { Checkbox } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import { CardsActions } from './cards.actions'

export type CardsColumns = {
  id: string
  holder: string
  number: string
  securityCode: string
  expirationDate: string
  billingAddress: string
  phone?: string
  type: number
}

const helper = createColumnHelper<CardsColumns>()

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
  helper.accessor((row) => row.holder, {
    id: 'holder',
    header: () => t('reporters:form.holder.label'),
    cell: ({ row }) => row.getValue('holder') as string,
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Actions
   */
  helper.display({
    id: 'actions',
    cell: ({ row }) => <CardsActions row={row.original} />,
    enableSorting: false,
    enableHiding: false
  })
]
