import { Button, Pagination } from '@nextui-org/react'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react'
import { DefaultAnimate } from '../animation/DefaultAnimate'
import { useDataTable } from './context/DataTableProvider'

export const TableBottomContent = () => {
  const { table, filter } = useDataTable()

  return (
    <div className="py-2 px-2 flex justify-center xs:justify-between items-center">
      <span className="hidden xs:flex text-small text-default-400">
        {table.getFilteredSelectedRowModel().rows.length} de{' '}
        {table.getFilteredRowModel().rows.length} linhas selecionadas
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
          />
        )}
      </DefaultAnimate>
      <div className="hidden sm:flex justify-end gap-1">
        <Button
          size="sm"
          variant="flat"
          onPress={() => table.setPageIndex(0)}
          isDisabled={!table.getCanPreviousPage()}
          isIconOnly
        >
          <ChevronsLeft />
        </Button>
        <Button
          size="sm"
          variant="flat"
          onPress={() => table.previousPage()}
          isDisabled={!table.getCanPreviousPage()}
          isIconOnly
        >
          <ChevronLeft />
        </Button>
        <Button
          size="sm"
          variant="flat"
          onPress={() => table.nextPage()}
          isDisabled={!table.getCanNextPage()}
          isIconOnly
        >
          <ChevronRight />
        </Button>
        <Button
          size="sm"
          variant="flat"
          onPress={() => table.setPageIndex(table.getPageCount() - 1)}
          isDisabled={!table.getCanNextPage()}
          isIconOnly
        >
          <ChevronsRight />
        </Button>
      </div>
    </div>
  )
}
