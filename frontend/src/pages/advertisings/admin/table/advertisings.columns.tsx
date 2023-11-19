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
    header: () => 'Título',
    cell: ({ row }) => row.getValue('title'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Description
   */
  helper.accessor((row) => row.description, {
    id: 'description',
    header: () => 'Descrição',
    cell: ({ row }) => row.getValue('description'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Advertising Type
   */
  helper.accessor((row) => row.type, {
    id: 'type',
    header: () => 'Tipo',
    cell: ({ row }) => {
      const status = row.getValue('type') as AdvertisingType

      const mapping = {
        BANNER: {
          label: 'Banner',
          color: 'primary'
        },
        WHOLE_PAGE: {
          label: 'Página inteira',
          color: 'default'
        },
        DOUBLE_PAGE: {
          label: 'Página dupla',
          color: 'secondary'
        }
      }

      return (
        <Chip color={mapping[AdvertisingType[status]].color}>
          {mapping[AdvertisingType[status]].label}
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
    header: () => 'Categoria',
    cell: ({ row }) => {
      const status = row.getValue('category') as AdvertisingCategory

      const mapping = {
        BEGINNING: {
          label: 'Começo',
          color: 'primary'
        },
        MIDDLE: {
          label: 'Meio',
          color: 'default'
        },
        END: {
          label: 'Fim',
          color: 'warning'
        }
      }

      return (
        <Chip color={mapping[AdvertisingCategory[status]].color}>
          {mapping[AdvertisingCategory[status]].label}
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
    header: () => 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as AdvertisingStatus

      const mapping = {
        PENDING: {
          label: 'Pendente',
          color: 'default'
        },
        APPROVED: {
          label: 'Aprovado',
          color: 'success'
        },
        REJECTED: {
          label: 'Rejeitado',
          color: 'danger'
        }
      }

      return (
        <Chip color={mapping[AdvertisingStatus[status]].color}>
          {mapping[AdvertisingStatus[status]].label}
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
