import { Checkbox, Chip } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import { MagazineActions } from './magazines.actions'

export type MagazineColumns = {
  id: string
  name: string
  description: string
  yearFounded: string
  publicationPeriod: string
  themeId: string
}

const helper = createColumnHelper<MagazineColumns>()

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
    header: () => t('magazines:form.name.label'),
    cell: ({ row }) => row.getValue('name'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Description
   */
  helper.accessor((row) => row.description, {
    id: 'description',
    header: () => t('magazines:form.description.label'),
    cell: ({ row }) => row.getValue('description'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Year founded
   */
  helper.accessor((row) => row.yearFounded, {
    id: 'yearFounded',
    header: () => t('magazines:form.year_founded.label'),
    cell: ({ row }) => (
      <Chip color="default">{row.getValue('yearFounded')}</Chip>
    ),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Publication Period
   */
  helper.accessor((row) => row.publicationPeriod, {
    id: 'publicationPeriod',
    header: () => t('magazines:form.publication_period.label'),
    cell: ({ row }) => {
      const status = row.getValue('publicationPeriod') as string

      const colors = {
        ANNUALLY: 'danger',
        BIANNUAL: 'warning',
        MONTHLY: 'default',
        BIMONTHLY: 'secondary',
        WEEKLY: 'primary'
      }

      return (
        <Chip color={colors[status]}>
          {t(
            `magazines:form.publication_period.options.${status.toLowerCase()}`
          )}
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
    cell: ({ row }) => <MagazineActions row={row.original} />,
    enableSorting: false,
    enableHiding: false
  })
]
