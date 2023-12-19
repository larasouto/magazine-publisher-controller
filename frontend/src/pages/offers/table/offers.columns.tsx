import { Text } from '@/components/ui/label2/Text'
import { Checkbox } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import { OffersActions } from './offers.actions'

export type OffersColumns = {
  id: string
  discountPercentage: string
  dates: {
    from: string
    to: string
  }
  from: string
  to: string
  editions: string
}

const helper = createColumnHelper<OffersColumns>()

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
   * Discount Percentage
   */
  helper.accessor((row) => row.discountPercentage, {
    id: 'discountPercentage',
    header: () => 'Porcentagem do desconto',
    cell: ({ row }) => row.getValue('discountPercentage'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * From
   */
  helper.accessor((row) => row.from, {
    id: 'from',
    header: () => 'De',
    cell: ({ row }) => (
      <Text format={{ 
          as: 'date',
          text: row.getValue('from')
        }} 
      />
    ),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * To
   */
  helper.accessor((row) => row.to, {
    id: 'to',
    header: () => 'Até',
    cell: ({ row }) => (
      <Text format={{ 
          as: 'date',
          text: row.getValue('to')
        }} 
      />
    ),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Editions
   */
  helper.accessor((row) => row.editions, {
    id: 'editions',
    header: () => 'Edições',
    cell: ({ row }) => row.getValue('editions'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Actions
   */
  helper.display({
    id: 'actions',
    cell: ({ row }) => <OffersActions row={row.original} />,
    enableSorting: false,
    enableHiding: false
  })
]
