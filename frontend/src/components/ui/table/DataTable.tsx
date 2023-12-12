import { configs } from '@/configs'
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TableBottomContent } from './TableBottomContent'
import { TableTopContent } from './TableTopContent'
import {
  DataTableContext,
  DataTableProvider
} from './context/DataTableProvider'
import { DataTableError } from './errors/DataTableError'

type DataTableProps<TData, TValue> = Pick<
  DataTableContext<TData>,
  'asyncFn' | 'internalLogicFn'
> & {
  columns: ColumnDef<TData, TValue>[]
  data?: TData[]
  hiddenColumns?: Extract<keyof TData, string>[]
} & {
  toolbar?: React.ReactNode
  isLoading?: boolean
  isError?: boolean
  ns?: string[]
}

export const DataTable = <TData, TValue>({
  columns,
  data = [],
  toolbar,
  ns,
  asyncFn,
  internalLogicFn,
  isLoading = false,
  isError = false,
  hiddenColumns
}: DataTableProps<TData, TValue>) => {
  const { t } = useTranslation('table')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    ...hiddenColumns?.reduce((acc, column) => ({ ...acc, [column]: false }), {})
  })
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  })

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize
    }),
    [pageIndex, pageSize]
  )

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
      globalFilter,
      rowSelection
    },
    debugTable: configs.debugTable
  })

  if (isError) {
    return <DataTableError />
  }

  if (isLoading) {
    return <CircularProgress color="primary" aria-label="loading..." />
  }

  return (
    <DataTableProvider value={{ ns, table, asyncFn, internalLogicFn }}>
      <Table
        aria-label="list table"
        isHeaderSticky
        topContent={<TableTopContent toolbar={toolbar} />}
        topContentPlacement="outside"
        bottomContent={<TableBottomContent />}
        bottomContentPlacement="outside"
        className="min-h-unit-24"
        classNames={{
          th: 'bg-default-100 dark:bg-default-200 min-w-max',
          tr: 'data-[selected=true]:bg-default-100 hover:bg-default-100 dark:data-[selected=true]:bg-default-200 dark:hover:bg-default-200',
          td: 'group-data-[first=true]:first:rounded-tl-lg group-data-[first=true]:last:rounded-tr-lg group-data-[last=true]:first:rounded-bl-lg group-data-[last=true]:last:rounded-br-lg'
        }}
      >
        <TableHeader>
          {table
            .getHeaderGroups()
            .flatMap((headerGroup) =>
              headerGroup.headers.map((header) => (
                <TableColumn key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableColumn>
              ))
            )}
        </TableHeader>
        <TableBody emptyContent={t('table.no_content')}>
          {table.getRowModel().rows?.map((row) => (
            <TableRow
              key={row.id}
              data-selected={row.getIsSelected()}
              onClick={() => row.toggleSelected()}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DataTableProvider>
  )
}
