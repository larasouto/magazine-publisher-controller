import { useAuth } from '@/hooks/useAuth'
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger
} from '@nextui-org/react'
import { HelpCircle, LogOut, Settings, UserCircle2 } from 'lucide-react'

export const UserDropdown = () => {
  const { signOut } = useAuth()

  return (
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
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">teste@teste.com</p>
        </DropdownItem>
        <DropdownSection title={'Actions'} showDivider>
          <DropdownItem
            key="settings"
            endContent={<Settings className="w-5 h-5" />}
          >
            Settings
          </DropdownItem>
          <DropdownItem
            key="help_and_feedback"
            endContent={<HelpCircle className="w-5 h-5" />}
          >
            Help & Feedback
          </DropdownItem>
        </DropdownSection>
        <DropdownSection>
          <DropdownItem
            key="logout"
            color="danger"
            endContent={<LogOut className="w-5 h-5" />}
            onClick={signOut}
          >
            Log Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}
