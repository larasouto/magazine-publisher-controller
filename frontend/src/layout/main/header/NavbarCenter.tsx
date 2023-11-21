import { routes } from '@/routes/routes'
import { Link, NavbarContent, NavbarItem } from '@nextui-org/react'

export const NavbarCenter = () => {
  return (
    <NavbarContent className="hidden sm:flex gap-4 center" justify="center">
      <NavbarItem>
        <Link color="foreground" href={routes.articles.index}>
          Mais vendidos
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" href="/">
          Novidades
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" href={routes.subscriptions.plans}>
          Assinaturas
        </Link>
      </NavbarItem>
    </NavbarContent>
  )
}
