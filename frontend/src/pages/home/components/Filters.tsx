import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'
import { ChevronDown } from 'lucide-react'

export const Filters = () => {
  return (
    <section className="flex gap-2 justify-between">
      <div className="flex gap-2">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button
              className="rounded-full h-7 bg-default-200 dark:bg-default-100"
              endContent={<ChevronDown className="w-5 h-5" />}
            >
              Revista
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem>hi</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button
              className="rounded-full h-7 bg-default-200 dark:bg-default-100"
              endContent={<ChevronDown className="w-5 h-5" />}
            >
              Preço
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem>hi</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button
              className="rounded-full h-7 bg-default-200 dark:bg-default-100"
              endContent={<ChevronDown className="w-5 h-5" />}
            >
              Revisões
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem>hi</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button
              className="rounded-full h-7 bg-default-200 dark:bg-default-100"
              endContent={<ChevronDown className="w-5 h-5" />}
            >
              Materiais
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem>hi</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button
            className="rounded-full h-7 bg-default-200 dark:bg-default-100"
            variant="bordered"
            endContent={<ChevronDown className="w-5 h-5" />}
          >
            Todos os filtros
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem>hi</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </section>
  )
}
