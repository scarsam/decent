import React, { useState, createContext, useContext } from "react";
import { IUserContext } from "../types";

const contextDefaultValues: IUserContext = {
  user: {
    id: "",
    email: "",
    password: "",
  },
};

export const UserContext = createContext<IUserContext>(contextDefaultValues);

export const { Provider: UserProviderTest } = UserContext;

const UserProvider: React.FC = ({ children }) => {
  const [store, updateStore] = useState(contextDefaultValues);

  return (
    <UserContext.Provider
      value={{
        user: store.user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserStore = () => {
  const { user } = useContext(UserContext);

  return { user };
};

export default UserProvider;
