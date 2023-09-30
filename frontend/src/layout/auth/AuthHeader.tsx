import { ThemeSwitcher } from '@/components/features/ThemeSwitcher'

export const AuthHeader = () => {
  return (
    <header className="h-[3.5rem] flex items-center justify-end p-4">
      <nav className="flex gap-2">
        <ThemeSwitcher />
      </nav>
    </header>
  )
}
