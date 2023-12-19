import { Checkbox, Chip } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import { subscriptionFrequency, subscriptionType } from '../mappers'
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
  price: string
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
    id: 'Nome',
    header: () => 'Nome',
    cell: ({ row }) => row.getValue('Nome'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Description
   */
  helper.accessor((row) => row.description, {
    id: 'Descrição',
    header: () => 'Descrição',
    cell: ({ row }) => row.getValue('Descrição'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Subscription Type
   */
  helper.accessor((row) => row.type, {
    id: 'Tipo',
    header: () => 'Tipo',
    cell: ({ row }) => {
      const status = row.getValue('Tipo') as SubscriptionType

      const colors = {
        PREMIUM: 'primary',
        STANDARD: 'default',
        BASIC: 'secondary'
      }

      return (
        <Chip color={colors[status]}>
          {subscriptionType[SubscriptionType[status]]}
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
    id: 'Frequência',
    header: () => 'Frequência',
    cell: ({ row }) => {
      const status = row.getValue('Frequência') as SubscriptionFrequency

      const colors = {
        WEEKLY: 'primary',
        MONTHLY: 'default',
        ANNUAL: 'danger',
        BIANNUAL: 'warning'
      }

      return (
        <Chip color={colors[status]}>
          {subscriptionFrequency[SubscriptionFrequency[status]]}
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
