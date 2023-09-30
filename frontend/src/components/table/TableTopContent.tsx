import { Input, Selection } from '@nextui-org/react'
import { Table } from '@tanstack/react-table'
import { Search } from 'lucide-react'

import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TableFilterButton } from './TableFilterButton'
import { TablePageSize } from './TablePageSize'

type TableTopContentProps<TData> = {
  table: Table<TData>
  globalFilter: string
  setGlobalFilter: Dispatch<SetStateAction<string>>
  toolbarButtons?: React.ReactNode
}

export function TableTopContent<TData>({
  globalFilter,
  setGlobalFilter,
  table,
  toolbarButtons
}: TableTopContentProps<TData>) {
  const { t } = useTranslation('table')
  const [type, setType] = useState<Selection>(new Set(['first']))

  const getFirstColumn = useMemo(() => {
    return table.getAllColumns().at(1)
  }, [table])

  const selectedType = useMemo(
    () => Array.from(type).join(', ').replace('_', ' '),
    [type]
  )

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-end">
          <div className="flex flex-grow gap-2 items-center">
            {selectedType === 'all' && (
              <Input
                id="search-debounced-input"
                value={globalFilter ?? ''}
                startContent={<Search className="text-default-500" />}
                onChange={(e) => setGlobalFilter(String(e.target.value))}
                placeholder={t('filter.search_by')}
                className="w-full sm:max-w-xs lg:max-w-sm"
              />
            )}
            {selectedType === 'first' && (
              <Input
                id="search-input"
                placeholder={t('filter.search_by')}
                value={String(getFirstColumn?.getFilterValue() ?? '')}
                startContent={<Search className="text-default-500" />}
                onChange={(event) =>
                  getFirstColumn?.setFilterValue(event.target.value)
                }
                className="w-full sm:max-w-xs lg:max-w-sm"
              />
            )}
            <div className="hidden sm:inline-flex">
              <TableFilterButton type={type} setType={setType} />
            </div>
          </div>
          <div className="flex gap-3 self-end sm:self-auto">
            {toolbarButtons}
          </div>
        </div>
        <TablePageSize table={table} />
      </div>
    </>
  )
}
