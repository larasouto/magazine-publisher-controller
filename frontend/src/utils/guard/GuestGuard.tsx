import { routes } from '@/routes/routes'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type GuestGuardProps = {
  children: React.ReactNode
}

export const GuestGuard = ({ children }: GuestGuardProps) => {
  const [mounted, setMounted] = useState(false)
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      navigate(routes.home.index)
    }
    setMounted(true)
  }, [token, navigate])

  return <>{mounted && children}</>
}
