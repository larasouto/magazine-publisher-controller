import { useTheme } from '@/hooks/useTheme'
import { Button } from '@nextui-org/react'
import { Moon, Sun } from 'lucide-react'

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button onClick={toggleTheme} variant="flat" isIconOnly>
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  )
}
