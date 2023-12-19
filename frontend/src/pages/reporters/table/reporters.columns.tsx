import { Checkbox, Chip, User } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import i18next, { t } from 'i18next'
import { ReporterActions } from './reporters.actions'

export type ReporterColumns = {
  id: string
  name: string
  email: string
  phone?: string
  cpf: string
  specialty: string
  status: string
  entryDate: string
  departureDate: string
}

const helper = createColumnHelper<ReporterColumns>()

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
    header: () => t('reporters:form.name.label'),
    cell: ({ row }) => {
      const name = row.getValue('Nome') as string

      return (
        <User name={name} description={row.original.email}>
          {name}
        </User>
      )
    },
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * CPF
   */
  helper.accessor((row) => row.cpf, {
    id: 'CPF',
    header: () => t('reporters:form.cpf.label'),
    cell: ({ row }) => row.getValue('CPF'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Entry date
   */
  helper.accessor((row) => row.entryDate, {
    id: 'Data de entrada',
    header: () => t('reporters:form.entry_date.label'),
    cell: ({ row }) => {
      const date = new Intl.DateTimeFormat(i18next.language)
      return date.format(new Date(row.getValue('Data de entrada')))
    },
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Departure date
   */
  helper.accessor((row) => row.departureDate, {
    id: 'Data de saída',
    header: () => t('reporters:form.departure_date.label'),
    cell: ({ row }) => {
      const date = new Intl.DateTimeFormat(i18next.language)
      const rowDate = row.getValue('Data de saída')

      return rowDate && date.format(new Date(row.getValue('Data de saída')))
    },
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Status
   */
  helper.accessor((row) => row.status, {
    id: 'Status',
    header: () => t('reporters:form.status.label'),
    cell: ({ row }) => {
      const status = row.getValue('Status') as string

      const colors = {
        ACTIVE: 'success',
        INACTIVE: 'danger',
        PAUSED: 'default',
        VACATION: 'secondary'
      }

      return (
        <Chip color={colors[status]}>
          {t(`reporters:form.status.options.${status.toLowerCase()}`)}
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
    cell: ({ row }) => <ReporterActions row={row.original} />,
    enableSorting: false,
    enableHiding: false
  })
]
