import { Checkbox } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import {  GraphocsOnDistributorsActions } from './graphicsOnDistributor.actions'

export type  GraphocsOnDistributorsColumns = {
  id: string
  grapihcsId: string
  distributorId: string
}

const helper = createColumnHelper< GraphocsOnDistributorsColumns>()

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
   * distributorId
   */
  helper.accessor((row) => row.distributorId, {
    id: 'distributorId',
    header: () => t('graphicsOnDistributor:form.distributorId.label'),
    cell: ({ row }) => row.getValue('distributorId'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * grapihcsId
   */
  helper.accessor((row) => row.grapihcsId, {
    id: 'grapihcsId',
    header: () => t('graphicsOnDistributor:form.grapihcsId.label'),
    cell: ({ row }) => row.getValue('grapihcsId'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Actions
   */
  helper.display({
    id: 'actions',
    cell: ({ row }) => < GraphocsOnDistributorsActions row={row.original} />,
    enableSorting: false,
    enableHiding: false
  })
]
