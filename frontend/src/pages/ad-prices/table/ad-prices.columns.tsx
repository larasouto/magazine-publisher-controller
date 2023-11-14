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
   * Name
   */
  helper.accessor((row) => row.bannerPrice, {
    id: 'name',
    header: () => t('AdPrices:form.name.label'),
    cell: ({ row }) => row.getValue('name'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Description
   */
  helper.accessor((row) => row.bannerPrice, {
    id: 'description',
    header: () => t('AdPrices:form.description.label'),
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
