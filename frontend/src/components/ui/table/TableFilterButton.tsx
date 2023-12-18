import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'
import { Settings2 } from 'lucide-react'
import { useMemo } from 'react'
import { useDataTable } from './context/DataTableProvider'

export const TableFilterButton = () => {
  const { filter, toggleFilter } = useDataTable()

  const filterMessage = useMemo(
    () => ({
      search: 'Pesquisar',
      pagination: 'Paginação',
      visibility: 'Colunas'
    }),
    []
  )

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button
            color="default"
            className="bg-default-100 hover:bg-default-200"
            isIconOnly
          >
            <Settings2 className="text-default-500 w-5 h-5" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          selectedKeys={Object.keys(filter).filter((key) => filter[key])}
          onAction={(key) => toggleFilter(key as keyof typeof filter)}
          selectionMode="multiple"
          aria-label="Select the type of filter"
        >
          {Object.keys(filter).map((key) => (
            <DropdownItem key={key}>{filterMessage[key]}</DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </>
  )
}
