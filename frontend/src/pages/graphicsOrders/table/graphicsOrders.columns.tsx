import { Checkbox, Chip } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import { Status } from '../graphicsOrders.schema'
import { GraphicsOrdersActions } from './graphicsOrders.actions'

export type GraphicsOrdersColumns = {
  id: string
  exampleNumber: number
  status: Status
  editionId: string
  bookstoreId: string
  graphicsDistributorId: string
}

const helper = createColumnHelper<GraphicsOrdersColumns>()

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
  /**
   * id
   */
  helper.accessor((row) => row.id, {
    id: 'id',
    header: () => t('Id do pedido'),
    cell: ({ row }) => row.getValue('id'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * bookstoreId
   */
  helper.accessor((row) => row.bookstoreId, {
    id: 'bookstoreId',
    header: () => t('Nome da grafica'),
    cell: ({ row }) => row.getValue('bookstoreId'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * editionId
   */
  helper.accessor((row) => row.id, {
    id: 'editionId',
    header: () => t('Nome da edição'),
    cell: ({ row }) => row.getValue('editionId'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * graphicsDistributorId
   */
  helper.accessor((row) => row.graphicsDistributorId, {
    id: 'graphicsDistributorId',
    header: () => t('Id da grafica com a distribuidora'),
    cell: ({ row }) => row.getValue('graphicsDistributorId'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * exampleNumber
   */
  helper.accessor((row) => row.exampleNumber, {
    id: 'exampleNumber',
    header: () => t('Numero de exemplares'),
    cell: ({ row }) => row.getValue('exampleNumber'),
    enableSorting: true,
    enableHiding: true
  }),
/**
 * status
 */
helper.accessor((row) => row.status, {
  id: 'status',
  header: () => t('Status'),
  cell: ({ row }) => {
    const status = row.getValue('status') as string

    const colors = {
      onHold: 'success',
      inPreparation: 'danger',
      onMyWay: 'default',
      deliv: 'secondary'
    }
    return <Chip color={colors[status]}>{t(`${status.toLowerCase()}`)}</Chip>
  },
  enableSorting: true,
  enableHiding: true
}),
  /**
   * Actions
   */
  helper.display({
    id: 'actions',
    cell: ({ row }) => <GraphicsOrdersActions row={row.original} />,
    enableSorting: false,
    enableHiding: false
  })
]
