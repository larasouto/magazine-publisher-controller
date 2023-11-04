import { profile } from '@/constants/profile-manage'
import { Listbox, ListboxItem, ListboxSection, cn } from '@nextui-org/react'
import { useLocation, useNavigate } from 'react-router-dom'

export const ProfileNavbar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="min-h-[calc(100vh-4.25rem)] w-[240px] p-5 border-r-1 border-default-100">
      <Listbox label="profile options">
        {profile.map((section) => (
          <ListboxSection key={section.id} title={section.title}>
            {section.children.map((item) => (
              <ListboxItem
                key={item.id}
                startContent={item.icon}
                description={item.description()}
                onClick={() => navigate(item.link ?? '#')}
                classNames={{
                  base: cn(location.pathname.includes(item.id) && 'bg-default')
                }}
              >
                {item.title()}
              </ListboxItem>
            ))}
          </ListboxSection>
        ))}
      </Listbox>
    </div>
  )
}
