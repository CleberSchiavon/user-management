"use client";
import { create } from "zustand";
import { createContext, useContext, useState } from "react";
import { UserLoginReturn } from "@repo/types";

const createAuthStore = (user?: UserLoginReturn) =>
  create<{
    user?: UserLoginReturn;
    setUser: (user: UserLoginReturn) => void;
    updateUser: (updates: Partial<UserLoginReturn>) => void;
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
  user?: UserLoginReturn;
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
