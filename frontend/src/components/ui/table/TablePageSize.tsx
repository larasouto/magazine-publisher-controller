import { useDataTable } from './context/DataTableProvider'

export const TablePageSize = () => {
  const { table } = useDataTable()

  return (
    <div className="flex justify-between items-center">
      <span className="text-default-400 text-small">
        Total de {table.getFilteredRowModel().rows.length} linhas
      </span>
      <label className="flex items-center text-default-400 text-small">
        Linhas por página:
        <select
          className="bg-transparent outline-none text-default-400 text-small hover:text-primary focus:text-primary focus-visible:text-primary"
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(+e.target.value)}
        >
          {[5, 10, 15].map((value) => {
            return (
              <option key={value} value={value}>
                {value}
              </option>
            )
          })}
        </select>
      </label>
    </div>
  )
}
