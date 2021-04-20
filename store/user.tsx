import React, { useState, createContext, useContext } from "react";
import { IUserContext, IUser } from "../types";

const contextDefaultValues: IUserContext = {
  user: {
    email: "",
    password: "",
  },
  updateUser: () => {},
};

export const UserContext = createContext<IUserContext>(contextDefaultValues);

export const { Provider: UserProviderTest } = UserContext;

const UserProvider: React.FC = ({ children }) => {
  const [store, updateStore] = useState(contextDefaultValues);

  const updateUser = (updatedUser: Partial<IUser>) =>
    updateStore((prevState) => ({
      ...prevState,
      user: { ...prevState.user, ...updatedUser },
    }));

  return (
    <UserContext.Provider
      value={{
        user: store.user,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserStore = () => {
  const { user, updateUser } = useContext(UserContext);

  return { user, updateUser };
};

export default UserProvider;
