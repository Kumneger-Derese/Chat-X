import './index.css'
import { StrictMode } from 'react'
import router from './app/routes.tsx'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { SocketContextProvider } from './context/socketContext.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SocketContextProvider>
        <RouterProvider router={router} />
      </SocketContextProvider>
    </QueryClientProvider>
  </StrictMode>
)

