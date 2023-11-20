import { AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'
import { useCallback } from 'react'
import { DebouncedInput } from '../DebouncedInput'
import { DefaultAnimate } from '../animation/DefaultAnimate'
import { TableDeleteButton } from './TableDeleteButton'
import { TableFilterButton } from './TableFilterButton'
import { TablePageSize } from './TablePageSize'
import { useDataTable } from './context/DataTableProvider'
import { DataTableViewOptions } from './helpers/DataTableViewOptions'

type TableTopContentProps = {
  toolbar?: React.ReactNode
}

export function TableTopContent({ toolbar }: TableTopContentProps) {
  const { filter, table, asyncFn } = useDataTable()

  /**
   * Deleta os itens selecionados. Esse método só irá funcionar
   * se o backend tiver o método `deleteMany()`.
   */
  const handleDelete = useCallback(async () => {
    const rows = table.getSelectedRowModel().rows
    const originalRows = rows.map((row) => row.original as { _id: string })
    const ids = originalRows.map((row) => row._id)

    await asyncFn?.(ids)
    table.toggleAllPageRowsSelected(false)
  }, [asyncFn, table])

  const filters = useCallback(() => {
    return [
      {
        key: 1,
        shouldRender: filter.search,
        component: (
          <DebouncedInput
            id="search-debounced-input"
            startContent={<Search className="text-foreground-500 w-5 h-5" />}
            placeholder={'Procurar por'}
            classNames={{
              inputWrapper: 'flex-grow w-full h-fit',
              input: 'w-full min-w-96 lg:w-72'
            }}
            value={table.getState().globalFilter}
            onChange={(value) => table.setGlobalFilter(String(value))}
            onClear={() => table.setGlobalFilter('')}
            debounce={150}
            autoComplete="off"
            isClearable
          />
        )
      },
      {
        key: 2,
        shouldRender: filter.visibility,
        component: <DataTableViewOptions />
      },
      {
        key: 3,
        shouldRender: !!asyncFn,
        component: (
          <TableDeleteButton
            isDisabled={!table.getSelectedRowModel().rows.length}
            handleDelete={handleDelete}
          />
        )
      }
    ]
  }, [table, filter.search, filter.visibility, asyncFn, handleDelete])

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-end">
          <div className="flex gap-2 items-center">
            <TableFilterButton />
            <AnimatePresence initial={false}>
              {filters()
                .filter((component) => component.shouldRender)
                .map((filter) => (
                  <DefaultAnimate key={filter.key}>
                    {filter.component}
                  </DefaultAnimate>
                ))}
            </AnimatePresence>
          </div>
          <div className="flex gap-3 self-end sm:self-auto">{toolbar}</div>
        </div>
        <TablePageSize />
      </div>
    </>
  )
}
