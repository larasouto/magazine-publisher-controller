import { Menu } from '@/components/ui/Menu'
import { useAuth } from '@/hooks/useAuth'
import { ProfileModal } from '@/pages/users/profile/profile.modal'
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  useDisclosure
} from '@nextui-org/react'
import { HelpCircle, LogOut, Settings, UserCircle2 } from 'lucide-react'
import parser from 'ua-parser-js'

export const UserDropdown = () => {
  const { signOut } = useAuth()
  const menu = useDisclosure()
  const profile = useDisclosure()

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
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">teste@teste.com</p>
          </DropdownItem>
          <DropdownSection title={'Actions'} showDivider>
            <DropdownItem
              key="settings"
              endContent={<Settings className="w-5 h-5" />}
              textValue="settings"
              onClick={profile.onOpen}
            >
              Profile
            </DropdownItem>
            <DropdownItem
              key="help_and_feedback"
              endContent={<HelpCircle className="w-5 h-5" />}
              textValue="help_and_feedback"
            >
              Help & Feedback
            </DropdownItem>
          </DropdownSection>
          <DropdownSection showDivider>
            <DropdownItem
              key="logout"
              color="primary"
              onClick={menu.onOpen}
              textValue="logout"
              shortcut={handleOs()}
            >
              Manage
            </DropdownItem>
          </DropdownSection>
          <DropdownSection>
            <DropdownItem
              key="logout"
              color="danger"
              endContent={<LogOut className="w-5 h-5" />}
              onClick={signOut}
              textValue="logout"
            >
              Log Out
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
      <Menu {...menu} hasSearch />
      <ProfileModal {...profile} />
    </>
  )
}
