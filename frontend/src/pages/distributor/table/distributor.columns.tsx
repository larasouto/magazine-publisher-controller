import { Checkbox } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import { DistributorActions } from './distributor.actions'

export type DistributorsColumns = {
  id: string
  name: string
  address: string
  region: string
}

const helper = createColumnHelper<DistributorsColumns>()

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
    header: () => t('distributor:form.name.label'),
    cell: ({ row }) => row.getValue('name'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * address
   */
  helper.accessor((row) => row.address, {
    id: 'address',
    header: () => t('distributor:form.address.label'),
    cell: ({ row }) => row.getValue('address'),
    enableSorting: true,
    enableHiding: true
  }),
    /**
   * Region
   */
  helper.accessor((row) => row.region, {
    id: 'region',
    header: () => t('distributor:form.region.label'),
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
