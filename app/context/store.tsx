import React, { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

interface DataType {
  loading: boolean;
  company: any;
  status: string;
}

interface ContextProps {
  children: React.ReactNode;
}

export const UserContext = createContext<DataType | undefined>(undefined);

export const UserProvider: React.FC<ContextProps> = ({ children }) => {
  const [data, setData] = useState<DataType>({
    loading: false,
    company: {},
    status: "",
  });

  return (
    <UserContext.Provider value={data}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};