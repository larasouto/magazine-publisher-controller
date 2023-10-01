import { Checkbox, Chip, User } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import i18next, { t } from 'i18next'

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
    id: 'name',
    header: () => t('reporters:form.name.label'),
    cell: ({ row }) => {
      const name = row.getValue('name') as string

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
    id: 'cpf',
    header: () => t('reporters:form.cpf.label'),
    cell: ({ row }) => row.getValue('cpf'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Entry date
   */
  helper.accessor((row) => row.entryDate, {
    id: 'entryDate',
    header: () => t('reporters:form.entry_date.label'),
    cell: ({ row }) => {
      const date = new Intl.DateTimeFormat(i18next.language)
      return date.format(new Date(row.getValue('entryDate')))
    },
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Departure date
   */
  helper.accessor((row) => row.departureDate, {
    id: 'departureDate',
    header: () => t('reporters:form.departure_date.label'),
    cell: ({ row }) => {
      const date = new Intl.DateTimeFormat(i18next.language)
      return date.format(new Date(row.getValue('departureDate')))
    },
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Status
   */
  helper.accessor((row) => row.status, {
    id: 'status',
    header: () => t('reporters:form.status.label'),
    cell: ({ row }) => {
      const status = row.getValue('status') as string

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
  })
]
