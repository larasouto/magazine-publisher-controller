import 'react-toastify/dist/ReactToastify.css'
import './i18n'
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClientProvider } from 'react-query'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { ToasterContainer } from './components/toast/Toaster'
import { queryClient } from './lib/react-query'
import { router } from './routes'
import { useThemeStore } from './stores/useThemeStore'

export const App = () => {
  const theme = useThemeStore((state) => state.theme)

  return (
    <React.StrictMode>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </HelmetProvider>
      <ToastContainer position="bottom-right" autoClose={2250} theme={theme} />
      <ToasterContainer />
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
