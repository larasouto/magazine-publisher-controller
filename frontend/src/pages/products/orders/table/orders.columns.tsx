import { Format } from '@/components/ui/label/Format'
import { routes } from '@/routes/routes'
import { Checkbox, Chip, Link } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import { OrderStatus } from '../orders.schema'

export type OrdersColumns = {
  id: string
  totalValue: string
  status: string
}

const helper = createColumnHelper<OrdersColumns>()

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
   * ID
   */
  helper.display({
    id: 'id',
    header: 'ID',
    cell: ({ row }) => (
      <Link href={routes.profile['my-purchases'].index} color="foreground">
        {row.original.id.slice(0, 8)}
      </Link>
    )
  }),
  /**
   * Total Value
   */
  helper.display({
    id: 'totalValue',
    header: 'Valor Total',
    cell: ({ row }) => <Format text={row.original.totalValue} type="price" />
  }),
  /**
   * Status
   */
  helper.display({
    id: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const mapping = {
        APPROVED: {
          color: 'success',
          text: 'Aprovado'
        },
        PENDING: {
          color: 'default',
          text: 'Pendente'
        },
        CANCELED: {
          color: 'danger',
          text: 'Cancelado'
        }
      }

      return (
        <Chip color={mapping[OrderStatus[row.original.status]].color}>
          {mapping[OrderStatus[row.original.status]].text}
        </Chip>
      )
    }
  })
]
