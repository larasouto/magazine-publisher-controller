import { Link, NavbarContent, NavbarItem } from '@nextui-org/react'

export const NavbarCenter = () => {
  return (
    <NavbarContent className="hidden sm:flex gap-4 center" justify="center">
      <NavbarItem>
        <Link color="foreground" href="/">
          Categories
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" href="/">
          What's new
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" href="/">
          Subscribe
        </Link>
      </NavbarItem>
    </NavbarContent>
  )
}
