import { NextUIProvider as LocalNextUIProvider } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'

export const NextUIProvider = ({ children }) => {
  const navigate = useNavigate()

  return (
    <LocalNextUIProvider navigate={navigate}>{children}</LocalNextUIProvider>
  )
}
