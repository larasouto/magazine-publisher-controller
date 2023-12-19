import { Text } from '@/components/ui/label2/Text'
import { Checkbox } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import { CouponsActions } from './coupons.actions'

export type CouponsColumns = {
  id: string
  couponCode: string
  discountAmount: string
  type: string
  expirationDate: string
}

const helper = createColumnHelper<CouponsColumns>()

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
   * Coupon Code
   */
  helper.accessor((row) => row.couponCode, {
    id: 'couponCode',
    header: () => 'Código do cupom',
    cell: ({ row }) => row.getValue('couponCode'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Discount
   */
  helper.accessor((row) => row.discountAmount, {
    id: 'discountAmount',
    header: () => 'Desconto',
    cell: ({ row }) => row.getValue('discountAmount'),
    enableSorting: true,
    enableHiding: true
  }),
   /**
   * Type
   */
   helper.accessor((row) => row.type, {
    id: 'type',
    header: () => 'Tipo de desconto',
    cell: ({ row }) => row.getValue('type'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Expiration Date
   */
   helper.accessor((row) => row.expirationDate, {
    id: 'expirationDate',
    header: () => 'Data de expiração',
    cell: ({ row }) => (
      <Text format={{ 
        as: 'date',
        text: row.getValue('expirationDate')
      }} />
    ),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Actions
   */
  helper.display({
    id: 'actions',
    cell: ({ row }) => <CouponsActions row={row.original} />,
    enableSorting: false,
    enableHiding: false
  })
]
