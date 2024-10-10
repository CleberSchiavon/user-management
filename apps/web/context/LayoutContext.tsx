import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useMemo,
} from "react";

interface LayoutContextProps {
  editUserModal: boolean;
  setEditUserModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteUserModal: boolean;
  setDeleteUserModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LayoutContext = createContext<LayoutContextProps>({
  editUserModal: false,
  setEditUserModal: () => {},
  deleteUserModal: false,
  setDeleteUserModal: () => {},
});

export const useLayoutContext = () => useContext(LayoutContext);

export const LayoutProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [editUserModal, setEditUserModal] = useState<boolean>(false);
  const [deleteUserModal, setDeleteUserModal] = useState<boolean>(false);
  const value = useMemo(
    () => ({
      editUserModal,
      setEditUserModal,
      deleteUserModal,
      setDeleteUserModal,
    }),
    [editUserModal, deleteUserModal]
  );

  return (
    <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>
  );
};
