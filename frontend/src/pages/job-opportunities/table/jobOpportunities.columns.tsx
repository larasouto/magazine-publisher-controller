import { Checkbox } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import { JobOpportunityActions } from './jobOpportunities.actions'

export type JobOpportunityColumns = {
  id: string
  office: string
  requirements: string
  hours: string
  wage: string
}

const helper = createColumnHelper<JobOpportunityColumns>()

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
   * Office
   */
  helper.accessor((row) => row.office, {
    id: 'office',
    header: () => t('Cargo'),
    cell: ({ row }) => row.getValue('office'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Requirements
   */
  helper.accessor((row) => row.requirements, {
    id: 'requirements',
    header: () => t('Requisitos'),
    cell: ({ row }) => row.getValue('requirements'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Hours
   */
    helper.accessor((row) => row.hours, {
      id: 'hours',
      header: () => t('Carga horária'),
      cell: ({ row }) => row.getValue('hours'),
      enableSorting: true,
      enableHiding: true
    }),
      /**
   * Wage
   */
      helper.accessor((row) => row.wage, {
        id: 'wage',
        header: () => t('Faixa salarial'),
        cell: ({ row }) => row.getValue('wage'),
        enableSorting: true,
        enableHiding: true
      }),
  /**
   * Actions
   */
  helper.display({
    id: 'actions',
    cell: ({ row }) => <JobOpportunityActions row={row.original} />,
    enableSorting: false,
    enableHiding: false
  })
]
