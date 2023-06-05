import { Color } from "chess.js";
import { createContext, ReactNode, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";
import { UserInfo } from "../types";

type UserContextProps = {
  children: ReactNode;
};

type UserContext = {
  user: UserInfo | undefined;
  onSetUser: (name: string, color: Color) => void;
};

export const UserContext = createContext({} as UserContext);

export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }: UserContextProps) => {
  const [user, setUser] = useLocalStorage<UserInfo | undefined>("user", undefined);

  const onSetUser = (name: string, color: Color) => {
    const user: UserInfo = {
      id: uuidv4(),
      name,
      avatar: `${import.meta.env.VITE_AVATAR}/${name}`,
      color,
      isLoser: false,
    };

    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user, onSetUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
