import { Logo } from '@/components/Logo'
import { NavbarBrand, NavbarContent, NavbarMenuToggle } from '@nextui-org/react'

type NavbarStartProps = {
  isMenuOpen: boolean
}

export const NavbarStart = ({ isMenuOpen }: NavbarStartProps) => {
  return (
    <NavbarContent>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        className="h-full sm:hidden"
      />
      <NavbarBrand className="flex gap-2">
        <Logo className="hidden sm:flex" />
        <p className="hidden sm:inline-flex font-bold text-inherit text-lg">
          Editora Galam
        </p>
      </NavbarBrand>
    </NavbarContent>
  )
}
