import { Key, createContext, useContext } from 'react'

type AddressContextProps = {
  id?: string
  selected: Key
  setSelected: (selected: Key) => void
}

export const AddressContext = createContext<AddressContextProps | null>(null)

export const useAddress = () => {
  const context = useContext(AddressContext)

  if (!context) {
    throw new Error('useAddress must be used within an AddressProvider')
  }

  return context
}
