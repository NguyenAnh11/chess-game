import { Color } from "chess.js";
import { cloneDeep } from "lodash";
import { createContext, ReactNode, useContext } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";
import { UserInfo } from "../types";

type UserContextProps = {
  children: ReactNode;
};

type UserContext = {
  user: UserInfo | undefined;
  onSetUser: (name: string) => void;
  onSetColor: (color: Color) => void;
};

export const UserContext = createContext({} as UserContext);

export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }: UserContextProps) => {
  const [user, setUser] = useLocalStorage<UserInfo | undefined>(
    "user",
    undefined
  );

  const onSetUser = (name: string) => {
    const user: UserInfo = {
      id: uuidv4(),
      name,
      avatar: `${import.meta.env.VITE_AVATAR}/${name}`,
      color: "w",
      countryFlag: import.meta.env.VITE_COUNTRY_FLAG_VIETNAM,
      isLoser: false,
    };

    setUser(user);
  };

  const onSetColor = (color: Color) => {
    const cloneUser = cloneDeep(user)!;
    cloneUser.color = color;
    setUser(cloneUser);
  };

  return (
    <UserContext.Provider value={{ user, onSetUser, onSetColor }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
