import { Pagination } from '@nextui-org/react'
import { DefaultAnimate } from '../animation/DefaultAnimate'
import { useDataTable } from './context/DataTableProvider'

export const TableBottomContent = () => {
  const { t, table, filter } = useDataTable()

  return (
    <div className="py-2 px-2 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4 justify-center items-center">
      <span className="flex justify-center xs:justify-start items-center text-small text-default-400">
        {t('table.rows_selected', {
          rows: table.getFilteredSelectedRowModel().rows.length,
          max_rows: table.getFilteredRowModel().rows.length
        })}
      </span>
      <DefaultAnimate>
        {filter.pagination && (
          <Pagination
            isCompact
            showControls
            color="primary"
            variant="flat"
            page={table.getState().pagination.pageIndex + 1}
            total={table.getPageCount()}
            isDisabled={!table.getCanPreviousPage() && !table.getCanNextPage()}
            onChange={(page) => table.setPageIndex(page - 1)}
            className="flex justify-center items-center"
          />
        )}
      </DefaultAnimate>
    </div>
  )
}
