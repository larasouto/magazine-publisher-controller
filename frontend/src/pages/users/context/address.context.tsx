import { Key, createContext, useContext } from 'react'

type TabsContextProps = {
  id?: string
  selected: Key
  setSelected: (selected: Key) => void
}

export const TabsContext = createContext<TabsContextProps | null>(null)

export const useTabs = () => {
  const context = useContext(TabsContext)

  if (!context) {
    throw new Error('useTabs must be used within an TabsProvider')
  }

  return context
}
