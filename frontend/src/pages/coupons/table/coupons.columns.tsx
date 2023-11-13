import { Checkbox, Chip } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import { CouponType } from '../coupons.schema'
import { CouponsActions } from './coupons.actions'

export type CouponsColumns = {
  id: string
  couponCode: string
  discountAmount: string
  expirationDate: string
  availableQuantity: string
  type: string
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
    header: () => t('coupons:form.coupon_code.label'),
    cell: ({ row }) => row.getValue('couponCode'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Discount Amount
   */
  helper.accessor((row) => row.discountAmount, {
    id: 'discountAmount',
    header: () => t('coupons:form.discount_amount.label'),
    cell: ({ row }) => row.getValue('discountAmount'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Expiration Date
   */
  helper.accessor((row) => row.expirationDate, {
    id: 'expirationDate',
    header: () => t('coupons:form.coupon_expiration_date.label'),
    cell: ({ row }) => row.getValue('expirationDate'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Available Quantity
   */
  helper.accessor((row) => row.availableQuantity, {
    id: 'availableQuantity',
    header: () => t('coupons:form.available_quantity.label'),
    cell: ({ row }) => row.getValue('availableQuantity'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Type
   */
  helper.accessor((row) => row.type, {
    id: 'type',
    header: () => t('coupons:form.coupon_type.label'),
    cell: ({ row }) => {
      const status = row.getValue('type') as CouponType

      const colors = {
        PERCENTAGE: 'primary',
        FIXED_VALUE: 'default'
      }

      return (
        <Chip color={colors[status]}>
          {t(
            `coupons:form.coupon_type.options.${CouponType[
              status
            ].toLowerCase()}`
          )}
        </Chip>
      )
    },
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
