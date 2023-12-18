import { Format } from '@/components/ui/label/Format'
import { Checkbox, Image } from '@nextui-org/react'
import { createColumnHelper } from '@tanstack/react-table'
import { t } from 'i18next'
import { CND_URL } from '../../../hooks/useSupabase'
import { EditionsActions } from './editions.actions'

export type EditionColumns = {
  id: string
  number: string
  title: string
  description: string
  coverPath: string
  price: string
  year: string
  publicationDate: string
  numberOfCopies: string
  numberOfPages: string
  magazineId: string
}

const helper = createColumnHelper<EditionColumns>()

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
    header: () => t('editions:info.label'),
    cell: ({ row }) => {
      return (
        <div className="flex gap-3">
          <Image
            src={`${CND_URL}/images/${row.original.coverPath}`}
            classNames={{
              wrapper: 'w-28 h-28',
              zoomedWrapper: 'bg-default-100',
              img: 'h-full w-20 object-cover rounded-sm'
            }}
          />
          <div className="pt-1 space-y-2">
            <div className="flex flex-col">
              <label className="tracking-wide text-tiny text-default-500">
                {t('editions:form.title.label')}
              </label>
              <h1 className="font-bold line-clamp-1">
                {row.getValue('title')}
              </h1>
            </div>
            <div className="flex flex-col">
              <label className="tracking-wide text-tiny text-default-500">
                {t('editions:form.description.label')}
              </label>
              <p className="line-clamp-2">{row.original.description}</p>
            </div>
          </div>
        </div>
      )
    },
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Price
   */
  helper.accessor((row) => row.price, {
    id: 'price',
    header: () => t('editions:form.price.label'),
    cell: ({ row }) => <Format text={row.getValue('price')} type="price" />,
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Number of Pages
   */
  helper.accessor((row) => row.numberOfPages, {
    id: 'numberOfPages',
    header: () => t('editions:form.number_of_pages.label'),
    cell: ({ row }) => <Format text={row.getValue('numberOfPages')} />,
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Publication Date
   */
  helper.accessor((row) => row.publicationDate, {
    id: 'publicationDate',
    header: () => t('editions:form.publication_date.label'),
    cell: ({ row }) => (
      <Format
        text={row.getValue('publicationDate')}
        type="date"
        options={{
          date: {
            month: '2-digit'
          }
        }}
      />
    ),
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Year
   */
  helper.accessor((row) => row.year, {
    id: 'year',
    header: () => t('editions:form.year.label'),
    cell: ({ row }) => <Format text={row.getValue('year')} />,
    enableSorting: true,
    enableHiding: true
  }),
  /**
   * Actions
   */
  helper.display({
    id: 'actions',
    cell: ({ row }) => <EditionsActions row={row.original} />,
    enableSorting: false,
    enableHiding: false
  })
]
