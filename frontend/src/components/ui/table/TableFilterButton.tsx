import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection
} from '@nextui-org/react'
import { Filter } from 'lucide-react'
import { useTranslation } from 'react-i18next'

type TableFilterButtonProps = {
  type: Selection
  setType: (keys: Selection) => void
}

export const TableFilterButton = ({
  type,
  setType
}: TableFilterButtonProps) => {
  const { t } = useTranslation('table')

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button className="bg-default-100" isIconOnly>
            <Filter className="w-5 h-5" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          selectionMode="single"
          aria-label="Select the type of filter"
          selectedKeys={type}
          onSelectionChange={setType}
        >
          <DropdownItem key="first">{t('filter.first_column')}</DropdownItem>
          <DropdownItem key="all">{t('filter.all_columns')}</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  )
}
