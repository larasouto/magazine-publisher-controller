import { useThemeStore } from '@/stores/useThemeStore'
import { Button } from '@nextui-org/react'
import { Moon, Sun } from 'lucide-react'
import { useEffect } from 'react'

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useThemeStore((state) => [
    state.theme,
    state.setTheme
  ])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    window.document.documentElement.removeAttribute('class')
    window.document.documentElement.classList.add(theme)
  }, [theme])

  return (
    <Button onClick={toggleTheme} variant="flat" className="z-50" isIconOnly>
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  )
}
