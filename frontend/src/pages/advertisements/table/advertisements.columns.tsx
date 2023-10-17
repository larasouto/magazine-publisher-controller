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
  helper.accessor((row) => row.title, {
    id: 'title',
    header: () => t('magazines:form.title.label'),
    cell: ({ row }) => row.getValue('title'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Description
   */
  helper.accessor((row) => row.description, {
    id: 'description',
    header: () => t('magazines:form.description.label'),
    cell: ({ row }) => row.getValue('description'),
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
   * Actions
   */
  helper.display({
    id: 'actions',
    cell: ({ row }) => <AdvertisementsActions row={row.original} />,
    enableSorting: false,
    enableHiding: false
  })
]
