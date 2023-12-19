import { Checkbox } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import { PaymentSubscriptionStatus } from '../subscriptions.schema'
import { SubscriptionsPaymentActions } from './subscriptions.actions'
import { GetSubscriptionName } from './subscriptions.id'

export type SubscriptionPaymentColumns = {
  id: string
  subscriptionId: string
  status: string
}

const helper = createColumnHelper<SubscriptionPaymentColumns>()

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
  helper.accessor((row) => row.subscriptionId, {
    id: 'Nome',
    header: () => 'Nome',
    cell: ({ row }) => <GetSubscriptionName row={row.original} />,
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Status
   */
  helper.accessor((row) => row.status, {
    id: 'Status',
    header: () => 'Status',
    cell: ({ row }) =>
      PaymentSubscriptionStatus[row.getValue('Status') as number],
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Actions
   */
  helper.display({
    id: 'actions',
    cell: ({ row }) => <SubscriptionsPaymentActions row={row.original} />,
    enableSorting: false,
    enableHiding: false
  })
]
