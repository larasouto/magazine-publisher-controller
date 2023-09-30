import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type ThemeProps = {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

export const useThemeStore = create<ThemeProps>()(
  devtools(
    persist(
      (set) => ({
        theme: 'dark',
        setTheme: (theme) => set({ theme: theme })
      }),
      {
        name: 'theme'
      }
    )
  )
)
