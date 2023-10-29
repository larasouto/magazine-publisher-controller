import { Button, Pagination } from '@nextui-org/react'
import { Table } from '@tanstack/react-table'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

type TableBottomContentProps<TData> = {
  table: Table<TData>
}

export const TableBottomContent = <TData,>({
  table
}: TableBottomContentProps<TData>) => {
  const { t } = useTranslation('table')
  const [page, setPages] = useState(1)

  return (
    <div className="py-2 px-2 flex justify-center xs:justify-between items-center">
      <span className="hidden xs:flex text-small text-default-400">
        {table.getFilteredSelectedRowModel().rows.length} {t('of')}{' '}
        {table.getFilteredRowModel().rows.length} {t('rows_selected')}.
      </span>
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={page}
        initialPage={1}
        total={table.getPageCount()}
        onChange={(page) => {
          setPages(page)
          table.setPageIndex(page - 1)
        }}
      />
      <div className="hidden sm:flex justify-end gap-2">
        <Button
          isDisabled={!table.getCanPreviousPage()}
          size="sm"
          variant="flat"
          onPress={() => {
            if (!table.getCanPreviousPage()) {
              return
            }
            setPages(page - 1)
            table.previousPage()
          }}
        >
          {t('previous')}
        </Button>
        <Button
          isDisabled={!table.getCanNextPage()}
          size="sm"
          variant="flat"
          onPress={() => {
            if (!table.getCanNextPage()) {
              return
            }
            setPages(page + 1)
            table.nextPage()
          }}
        >
          {t('next')}
        </Button>
      </div>
    </div>
  )
}
