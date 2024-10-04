'use client'
import { Inter } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import '@repo/tailwind-config/globals.css'
import 'react-toastify/dist/ReactToastify.css'

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
          <div className="flex bg-white h-screen">
            <div className="flex-[4] bg-gray-200 p-5">
              {children}
            </div>
          </div>
      </body>
    </html>
  )
}
