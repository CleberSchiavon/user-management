'use client'
import { useState, createContext, useContext } from 'react'
import { create } from 'zustand'
import {User} from '@repo/types'

const createStore = (
  loading: boolean,
  users?: User[],
) =>
  create<{
    users?: User[]
    loading: boolean
    setLoading: (loading: boolean) => void
    setUsers: (users: User[]) => void
  }>((set) => ({
    users,
    setUsers(users) {
      set({ users })
    },
    loading,
    setLoading(loading) {
      set({ loading })
    },
  }))

const UserStoreContext = createContext<ReturnType<typeof createStore> | null>(null)

export const useUserStore = () => {
  if (!UserStoreContext)
    throw new Error('useUserStore must be used within a UserStoreProvider')
  return useContext(UserStoreContext)!
}

const UserStoreProvider = ({
  loading = true,
  users,
  children,
}: {
  users?: User[]
  children: React.ReactNode
  loading: boolean
}) => {
  const [store] = useState(() =>
    createStore(loading, users),
  )
  return <UserStoreContext.Provider value={store}>{children}</UserStoreContext.Provider>
}

export default UserStoreProvider
