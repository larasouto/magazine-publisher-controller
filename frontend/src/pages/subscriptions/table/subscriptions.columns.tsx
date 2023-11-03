import { Checkbox, Chip } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import {
  SubscriptionFrequency,
  SubscriptionType
} from '../subscriptions.schema'
import { SubscriptionsActions } from './subscriptions.actions'

export type SubscriptionColumns = {
  id: string
  name: string
  description: string
  type: string
  frequency: string
  magazineId: string
}

const helper = createColumnHelper<SubscriptionColumns>()

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
  helper.accessor((row) => row.name, {
    id: 'name',
    header: () => t('subscriptions:form.name.label'),
    cell: ({ row }) => row.getValue('name'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Description
   */
  helper.accessor((row) => row.description, {
    id: 'description',
    header: () => t('subscriptions:form.description.label'),
    cell: ({ row }) => row.getValue('description'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Subscription Type
   */
  helper.accessor((row) => row.type, {
    id: 'type',
    header: () => t('subscriptions:form.subscription_type.label'),
    cell: ({ row }) => {
      const status = row.getValue('type') as SubscriptionType

      const colors = {
        PREMIUM: 'primary',
        STANDARD: 'default',
        BASIC: 'secondary'
      }

      return (
        <Chip color={colors[status]}>
          {t(
            `subscriptions:form.subscription_type.options.${SubscriptionType[
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
   * Subscription Frequency
   */
  helper.accessor((row) => row.frequency, {
    id: 'frequency',
    header: () => t('subscriptions:form.frequency.label'),
    cell: ({ row }) => {
      const status = row.getValue('frequency') as SubscriptionFrequency

      const colors = {
        WEEKLY: 'primary',
        MONTHLY: 'default',
        ANNUAL: 'danger',
        BIANNUAL: 'warning'
      }

      return (
        <Chip color={colors[status]}>
          {t(
            `subscriptions:form.frequency.options.${SubscriptionFrequency[
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
    cell: ({ row }) => <SubscriptionsActions row={row.original} />,
    enableSorting: false,
    enableHiding: false
  })
]
