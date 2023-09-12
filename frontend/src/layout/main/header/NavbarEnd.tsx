import { ThemeSwitcher } from '@/components/features/ThemeSwitcher'
import {
  Button,
  Link,
  NavbarContent,
  NavbarItem,
  NavbarMenu
} from '@nextui-org/react'
import { ShoppingCart } from 'lucide-react'
import { UserDropdown } from './UserDropdown'

export const NavbarEnd = () => {
  return (
    <>
      <NavbarContent justify="end" className="gap-2">
        <NavbarItem>
          <Button variant="flat" isIconOnly>
            <ShoppingCart className="w-5 h-5" />
          </Button>
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
          <Link color="foreground" href="/">
            Cart
          </Link>
        </NavbarItem>
      </NavbarMenu>
    </>
  )
}
