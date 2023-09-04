import { LocaleSwitcher } from '@/components/features/LocaleSwitcher'
import { ThemeSwitcher } from '@/components/features/ThemeSwitcher'

export const AuthHeader = () => {
  return (
    <header className="h-[3.5rem] flex items-center justify-end p-2">
      <nav className="flex gap-2">
        <LocaleSwitcher />
        <ThemeSwitcher />
      </nav>
    </header>
  )
}
