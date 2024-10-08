"use client";
import { create } from "zustand";
import { createContext, useContext, useState } from "react";

interface User {
  username?: string;
  email?: string;
  phoneNumber?: string;
}

const createAuthStore = (user?: User) =>
  create<{
    user?: User;
    setUser: (user: User) => void;
    updateUser: (updates: Partial<User>) => void;
  }>((set) => ({
    user,
    setUser(user) {
      set({ user });
    },
    updateUser(updates) {
      set((state) => ({ user: { ...state.user, ...updates } }));
    },
  }));

const AuthStoreContext = createContext<ReturnType<
  typeof createAuthStore
> | null>(null);

export const useAuthStore = () => {
  const context = useContext(AuthStoreContext);
  if (!context) {
    throw new Error("useAuthStore must be used within an AuthStoreProvider");
  }
  return context;
};

const AuthStoreProvider = ({
  user,
  children,
}: {
  user?: User;
  children: React.ReactNode;
}) => {
  const [store] = useState(() => createAuthStore(user));

  return (
    <AuthStoreContext.Provider value={store}>
      {children}
    </AuthStoreContext.Provider>
  );
};

export default AuthStoreProvider;
