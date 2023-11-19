import { Checkbox } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import { AdPricesActions } from './ad-prices.actions'

export type AdPricesColumns = {
  id: string
  bannerPrice: string
  wholePagePrice: string
  doublePagePrice: string
  beginningPrice: string
  middlePrice: string
  endPrice: string
}

const helper = createColumnHelper<AdPricesColumns>()

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
   * Beginning price
   */
  helper.accessor((row) => row.beginningPrice, {
    id: 'beginningPrice',
    header: () => 'Preço início',
    cell: ({ row }) => row.getValue('beginningPrice'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Banner price
   */
  helper.accessor((row) => row.bannerPrice, {
    id: 'description',
    header: () => 'Preço do banner',
    cell: ({ row }) => row.getValue('description'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Actions
   */
  helper.display({
    id: 'actions',
    cell: ({ row }) => <AdPricesActions row={row.original} />,
    enableSorting: false,
    enableHiding: false
  })
]
