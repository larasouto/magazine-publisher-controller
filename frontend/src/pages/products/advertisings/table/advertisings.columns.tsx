import { Checkbox } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import { PaymentAdvertisingStatus } from '../advertisings.schema'
import { AdvertisingsPaymentActions } from './advertisings.actions'
import { GetAdvertisingName } from './advertisings.id'

export type AdvertisingPaymentColumns = {
  id: string
  advertisingId: string
  status: string
}

const helper = createColumnHelper<AdvertisingPaymentColumns>()

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
  helper.accessor((row) => row.advertisingId, {
    id: 'advertisingId',
    header: () => 'ID do anúncio',
    cell: ({ row }) => <GetAdvertisingName row={row.original} />,
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Status
   */
  helper.accessor((row) => row.status, {
    id: 'status',
    header: () => 'Status',
    cell: ({ row }) =>
      PaymentAdvertisingStatus[row.getValue('status') as number],
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Actions
   */
  helper.display({
    id: 'actions',
    cell: ({ row }) => <AdvertisingsPaymentActions row={row.original} />,
    enableSorting: false,
    enableHiding: false
  })
]
