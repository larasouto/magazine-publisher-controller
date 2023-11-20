import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'
import { Columns } from 'lucide-react'
import { useDataTable } from '../context/DataTableProvider'

export const DataTableViewOptions = () => {
  const { t, table } = useDataTable()

  const selectedColumns = () =>
    table.getAllColumns().filter((column) => column.getIsVisible())

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="flat"
          startContent={<Columns className="h-5 w-5" />}
          className="ml-auto gap-2 bg-default-100 hover:bg-default-200 text-foreground-500"
        >
          {t('filter.toggle.visibility')}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        selectionMode="multiple"
        aria-label="Select the columns to show"
        selectedKeys={selectedColumns().map((column) => column.id)}
        onAction={(key) => table.getColumn(String(key))?.toggleVisibility()}
      >
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => (
            <DropdownItem key={column.id}>{t(column.id)}</DropdownItem>
          ))}
      </DropdownMenu>
    </Dropdown>
  )
}
