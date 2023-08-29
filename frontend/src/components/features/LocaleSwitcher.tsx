import { Lang } from '@/i18n'
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@nextui-org/react'
import { Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'

type Language = {
  code: Lang
  label: string
  link?: string
}

const langs: Language[] = [
  {
    code: 'en-US',
    label: 'English',
    link: 'https://flagcdn.com/us.svg'
  },
  {
    code: 'pt-BR',
    label: 'Português',
    link: 'https://flagcdn.com/br.svg'
  }
]

export const LocaleSwitcher = () => {
  const { i18n } = useTranslation()

  const setLanguage = (lang: Lang) => {
    i18n.changeLanguage(lang)
  }

  return (
    <div className="flex gap-2">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button isIconOnly variant="flat">
            <Languages size={20} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
          {langs.map((lang) => (
            <DropdownItem
              key={lang.code}
              startContent={<Avatar className="w-5 h-5" src={lang.link} />}
              onClick={() => setLanguage(lang.code)}
            >
              {lang.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
