import { Checkbox, Chip } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import {
  AdvertisingCategory,
  AdvertisingStatus,
  AdvertisingType
} from '../advertisings.schema'
import { AdvertisingsActions } from './advertisings.actions'

export type AdvertisingColumns = {
  id: string
  title: string
  description: string
  category: string
  type: string
  status: string
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
    header: () => t('advertisings:form.title.label'),
    cell: ({ row }) => row.getValue('title'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Description
   */
  helper.accessor((row) => row.description, {
    id: 'description',
    header: () => t('advertisings:form.description.label'),
    cell: ({ row }) => row.getValue('description'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Advertising Type
   */
  helper.accessor((row) => row.type, {
    id: 'type',
    header: () => t('advertisings:form.advertising_type.label'),
    cell: ({ row }) => {
      const status = row.getValue('type') as AdvertisingType

      const colors = {
        BANNER: 'primary',
        WHOLE_PAGE: 'default',
        DOUBLE_PAGE: 'secondary'
      }

      return (
        <Chip color={colors[status]}>
          {t(
            `advertisings:form.advertising_type.options.${AdvertisingType[
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
   * Advertising Category
   */
  helper.accessor((row) => row.category, {
    id: 'category',
    header: () => t('advertisings:form.category.label'),
    cell: ({ row }) => {
      const status = row.getValue('frequency') as AdvertisingCategory

      const colors = {
        BEGINNING: 'primary',
        MIDDLE: 'default',
        END: 'danger'
      }

      return (
        <Chip color={colors[status]}>
          {t(
            `advertisings:form.category.options.${AdvertisingCategory[
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
   * Advertising Status
   */
  helper.accessor((row) => row.status, {
    id: 'status',
    header: () => t('advertisings:form.status.label'),
    cell: ({ row }) => {
      const status = row.getValue('status') as AdvertisingStatus

      const colors = {
        BEGINNING: 'primary',
        MIDDLE: 'default',
        END: 'danger'
      }

      return (
        <Chip color={colors[status]}>
          {t(
            `advertisings:form.status.options.${AdvertisingStatus[
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
    cell: ({ row }) => <AdvertisingsActions row={row.original} />,
    enableSorting: false,
    enableHiding: false
  })
]
