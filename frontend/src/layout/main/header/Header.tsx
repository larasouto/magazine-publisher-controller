import { Navbar } from '@nextui-org/react'
import { useState } from 'react'
import { NavbarCenter } from './NavbarCenter'
import { NavbarEnd } from './NavbarEnd'
import { NavbarStart } from './NavbarStart'

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header>
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        isBlurred={false}
        className="overflow-y-auto"
        isBordered
      >
        <NavbarStart isMenuOpen={isMenuOpen} />
        <NavbarCenter />
        <NavbarEnd />
      </Navbar>
    </header>
  )
}
