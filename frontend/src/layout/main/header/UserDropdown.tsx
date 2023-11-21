import { Menu } from '@/components/ui/Menu'
import { useUserDetails } from '@/contexts/user-details-provider'
import { useAuth } from '@/hooks/useAuth'
import { routes } from '@/routes/routes'
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  useDisclosure
} from '@nextui-org/react'
import {
  HelpCircle,
  LogOut,
  Megaphone,
  Settings,
  ShoppingBag,
  UserCircle2
} from 'lucide-react'
import parser from 'ua-parser-js'

export const UserDropdown = () => {
  const { signOut } = useAuth()
  const { isAdmin } = useUserDetails()
  const menu = useDisclosure()

  const handleOs = () => {
    const os = parser(navigator.userAgent).os.name

    switch (os) {
      case 'Mac OS':
        return '⌘ K'
      case 'Windows':
        return 'Ctrl K'
      default:
        return ''
    }
  }

  return (
    <>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            showFallback
            isBordered
            as="button"
            radius="md"
            className="transition-transform"
            color="primary"
            name="Jason Hughes"
            size="sm"
            src="https://i.pravatar.cc/150"
            fallback={<UserCircle2 className="w-5 h-5" />}
            classNames={{
              base: 'ring-violet-500'
            }}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem
            key="profile"
            className="h-14 gap-2"
            textValue="profile"
          >
            <p className="font-semibold">teste@teste.com</p>
          </DropdownItem>
          <DropdownSection title={'Actions'} showDivider>
            <DropdownItem
              key="settings"
              endContent={<Settings className="w-5 h-5" />}
              textValue="settings"
              href={routes.profile.addresses.index}
            >
              Perfil
            </DropdownItem>
            <DropdownItem
              key="advertisings"
              endContent={<Megaphone className="w-5 h-5" />}
              textValue="advertisings"
              href={routes.advertisings.index}
            >
              Propagandas
            </DropdownItem>
            <DropdownItem
              key="help_and_feedback"
              endContent={<HelpCircle className="w-5 h-5" />}
              textValue="help_and_feedback"
            >
              Ajuda & Feedback
            </DropdownItem>
          </DropdownSection>
          {isAdmin() &&
            ((
              <DropdownSection showDivider>
                <DropdownItem
                  key="dashboard"
                  color="primary"
                  onClick={menu.onOpen}
                  textValue="dashboard"
                  shortcut={handleOs()}
                >
                  Painel de Controle
                </DropdownItem>
              </DropdownSection>
            ) as any)}
          <DropdownItem
            key="buy"
            endContent={<ShoppingBag className="w-5 h-5" />}
            textValue="buy"
            showDivider
            href={routes.profile['my-purchases'].index}
          >
            Minhas Compras
          </DropdownItem>
          <DropdownSection>
            <DropdownItem
              key="logout"
              color="danger"
              endContent={<LogOut className="w-5 h-5" />}
              onClick={signOut}
              textValue="logout"
            >
              Deslogar
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
      <Menu {...menu} hasSearch />
    </>
  )
}
