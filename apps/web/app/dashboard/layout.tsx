'use client'
import { Navbar } from '@repo/ui'
import { DropdownNavbarOptions } from '@repo/ui/src/Navbar'
import { LogOut } from 'lucide-react'
import UserStoreProvider from 'store/UserStore'

export default function Layout({ children }: { children: React.ReactNode }) {

  const users = []

  const dropdownNavbarOptions: DropdownNavbarOptions[] = [
    {
      name: 'Sair',
      icon:  <LogOut />,
      onClick: () => console.log('Função de sair aqui'),
    },
  ]
  return (
        <UserStoreProvider
          loading={false}
          users={users}
        >
          <div className="flex bg-white">
            <div className="flex-[4] bg-gray-200 p-5">
              <Navbar
                dropdownOptions={dropdownNavbarOptions}
                navbarTitle={"Dashboard - Usuários"}
              />
              {children}
            </div>
          </div>
        </UserStoreProvider>
  )
}
