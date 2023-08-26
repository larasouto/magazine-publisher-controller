import 'react-toastify/dist/ReactToastify.css'
import './i18n'
import './index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClientProvider } from 'react-query'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { router } from './routes'
import { queryClient } from './lib/react-query'
import { NextUIProvider } from '@nextui-org/react'

export const App = () => {
  return (
    <React.StrictMode>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <NextUIProvider>
            <main>
              <RouterProvider router={router} />
            </main>
          </NextUIProvider>
        </QueryClientProvider>
      </HelmetProvider>
      <ToastContainer position="bottom-right" autoClose={2250} theme={'dark'} />
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
