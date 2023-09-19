import { ThemeSwitcher } from '@/components/features/ThemeSwitcher'
import { useCartStore } from '@/stores/useCartStore'
import {
  Badge,
  Button,
  NavbarContent,
  NavbarItem,
  NavbarMenu
} from '@nextui-org/react'
import { ShoppingCart } from 'lucide-react'
import { UserDropdown } from './UserDropdown'

export const NavbarEnd = () => {
  const [toggleOpen, items] = useCartStore((state) => [
    state.toggleOpen,
    state.items
  ])

  return (
    <>
      <NavbarContent justify="end" className="gap-2">
        <NavbarItem>
          <Badge content={items.length} color="danger">
            <Button variant="flat" onClick={toggleOpen} isIconOnly>
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </Badge>
        </NavbarItem>
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem className="ml-1">
          <UserDropdown />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        <NavbarItem>
          <Button variant="shadow">Cart</Button>
        </NavbarItem>
      </NavbarMenu>
    </>
  )
}
