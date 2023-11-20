import { Checkbox } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import { ArticlesActions } from './articles.actions'

export type ArticleColumns = {
  id: string
  title: string
  subtitle: string
  text: string
  editionId: string
  categoryId: string
  themeId: string
  numberOfPages: number
  initialPage: number
  finalPage: number
  reporters: string[]
  photographers: string[]
}

const helper = createColumnHelper<ArticleColumns>()

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
    header: () => 'Título',
    cell: ({ row }) => row.getValue('title'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Subtitle
   */
  helper.accessor((row) => row.subtitle, {
    id: 'subtile',
    header: () => 'Subtítulo',
    cell: ({ row }) => row.getValue('subtitle'),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Actions
   */
  helper.display({
    id: 'actions',
    cell: ({ row }) => <ArticlesActions row={row.original} />,
    enableSorting: false,
    enableHiding: false
  })
]
