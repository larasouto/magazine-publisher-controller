import { Checkbox, User } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import { ReporterActions } from './news-reports.actions'

export type NewsReportColumns = {
  id: string
  title: string
  numberOfPages: string
  initialPage: string
  finalPage: string
  numberOfPhotos: string
  photographerId: string
  reporterId: string
  categoryId: string
}

const helper = createColumnHelper<NewsReportColumns>()

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
   * Title
   */
  helper.accessor((row) => row.title, {
    id: 'title',
    header: () => t('photographers:form.title.label'),
    cell: ({ row }) => {
      const name = row.getValue('title') as string

      return (
        <User name={name} description={row.original.title}>
          {name}
        </User>
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
