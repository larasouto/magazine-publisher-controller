import { Checkbox } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'

export type CategoryColumns = {
  name: string
  description: string
}

const helper = createColumnHelper<CategoryColumns>()

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
    header: () => 'Nome',
    cell: ({ row }) => row.getValue('name'),
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
  })
]
