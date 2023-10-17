import { LabelPrice } from '@/components/ui/LabelPrice'
import { Checkbox } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import { AdvertisementsActions } from './advertisements.actions'

export type AdvertisingColumns = {
  id: string
  name: string
  categoryAdvertising: string
  numberOfPages: string
  price: string
  magazineId: string
}

const helper = createColumnHelper<AdvertisingColumns>()

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
   * Title
   */
  helper.accessor((row) => row.name, {
    id: 'name',
    header: () => t('magazines:form.name.label'),
    cell: ({ row }) => row.getValue('name'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Description
   */
  helper.accessor((row) => row.categoryAdvertising, {
    id: 'categoryAdvertising',
    header: () => t('magazines:form.categoryAdvertising.label'),
    cell: ({ row }) => row.getValue('categoryAdvertising'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Price
   */
  helper.accessor((row) => row.price, {
    id: 'price',
    header: () => t('magazines:form.price.label'),
    cell: ({ row }) => <LabelPrice toFormat={row.getValue('price')} />,
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * numberOfPages
   */
  helper.accessor((row) => row.numberOfPages, {
    id: 'price',
    header: () => t('magazines:form.numberOfPages.label'),
    cell: ({ row }) => <LabelPrice toFormat={row.getValue('numberOfPages')} />,
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Actions
   */
  helper.display({
    id: 'actions',
    cell: ({ row }) => <AdvertisementsActions row={row.original} />,
    enableSorting: false,
    enableHiding: false
  })
]
