'use client'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import '@repo/tailwind-config/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import AuthStoreProvider from '@/store/AuthStore'

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return (
    <html lang="en">
      <body className={inter.className}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <ToastContainer />
          <div className="flex h-screen">
            <div className="flex-[4] p-5">
              <AuthStoreProvider user={undefined}>
              {children}
              </AuthStoreProvider>
            </div>
          </div>
      </body>
    </html>
  )
}
