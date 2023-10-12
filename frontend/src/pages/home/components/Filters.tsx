import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  cn
} from '@nextui-org/react'
import { ChevronDown } from 'lucide-react'
import { ComponentProps } from 'react'

type FilterProps = ComponentProps<'section'>

export const Filters = ({ className, ...props }: FilterProps) => {
  return (
    <section
      className={cn(
        'flex gap-2 justify-between overflow-x-auto md:overflow-x-hidden',
        className
      )}
      {...props}
    >
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
            className="rounded-full h-7 bg-default-200 dark:bg-default-100 min-w-max"
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
