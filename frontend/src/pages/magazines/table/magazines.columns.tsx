import { Checkbox, Chip } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import { PublicationPeriod } from '../magazines.schema'
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
    id: 'Nome',
    header: () => t('magazines:form.name.label'),
    cell: ({ row }) => row.getValue('Nome'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Description
   */
  helper.accessor((row) => row.description, {
    id: 'Descrição',
    header: () => t('magazines:form.description.label'),
    cell: ({ row }) => row.getValue('Descrição'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Year founded
   */
  helper.accessor((row) => row.yearFounded, {
    id: 'Ano de fundação',
    header: () => t('magazines:form.year_founded.label'),
    cell: ({ row }) => (
      <Chip color="default">{row.getValue('Ano de fundação')}</Chip>
    ),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Publication Period
   */
  helper.accessor((row) => row.publicationPeriod, {
    id: 'Período de publicação',
    header: () => t('magazines:form.publication_period.label'),
    cell: ({ row }) => {
      const status = row.getValue('Período de publicação') as PublicationPeriod

      const colors = {
        WEEKLY: 'primary',
        MONTHLY: 'default',
        BIMONTHLY: 'secondary',
        ANNUALLY: 'danger',
        BIANNUAL: 'warning'
      }

      return (
        <Chip color={colors[status]}>
          {t(
            `magazines:form.publication_period.options.${PublicationPeriod[
              status
            ].toLowerCase()}`
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
