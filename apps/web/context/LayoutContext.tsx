import { User } from "@repo/types";
import React, { createContext, ReactNode, useContext, useState, useMemo } from "react";

interface LayoutContextProps {
    editUserModal: boolean;
    setEditUserModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LayoutContext = createContext<LayoutContextProps>({
    editUserModal: false,
    setEditUserModal: () => {},
});

export const useLayoutContext = () => useContext(LayoutContext);

export const LayoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [editUserModal, setEditUserModal] = useState<boolean>(false);

    const value = useMemo(() => ({ editUserModal, setEditUserModal }), [editUserModal]);

    return (
        <LayoutContext.Provider value={value}>
            {children}
        </LayoutContext.Provider>
    );
};