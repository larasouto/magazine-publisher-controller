import { Checkbox } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import { DistributorActions } from './distributor.actions'

export type DistributorColumns = {
  id: string
  address: string
  name: string
  region: string
}

const helper = createColumnHelper<DistributorColumns>()

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
   * address
   */
  helper.accessor((row) => row.address, {
    id: 'address',
    header: () => t('graphics:form.address.label'),
    cell: ({ row }) => row.getValue('address'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * name
   */
  helper.accessor((row) => row.name, {
    id: 'name',
    header: () => t('graphics:form.name.label'),
    cell: ({ row }) => row.getValue('name'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * region
   */
  helper.accessor((row) => row.region, {
    id: 'region',
    header: () => t('graphics:form.region.label'),
    cell: ({ row }) => row.getValue('region'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Actions
   */
  helper.display({
    id: 'actions',
    cell: ({ row }) => <DistributorActions row={row.original} />,
    enableSorting: false,
    enableHiding: false
  })
]
