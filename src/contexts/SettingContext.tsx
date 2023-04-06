import {
  ReactNode,
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { Mode, Setting } from "../types";

type SettingContextProps = {
  mode: Mode;
  children: ReactNode;
};

type SettingContext = {
  mode: Mode;
  setting: Setting;
  onSetting: Dispatch<SetStateAction<Setting>>;
  isOpenEditSetting: boolean;
  onOpenEditSetting: (isOpen: boolean) => void;
};

export const SettingContext = createContext({} as SettingContext);

export const useSetting = () => useContext(SettingContext);

const SettingProvider = ({ mode, children }: SettingContextProps) => {
  const [isOpenEditSetting, setIsOpenEditSetting] = useState(false);

  const [setting, setSetting] = useLocalStorage<Setting>("setting", {
    board: {
      pieceColor: "neo_wood",
      squareColor: "green",
      moveMethod: "dc",
      animation: "none",
      playSound: 1,
      showArrow: 1,
      showHintMove: 1,
      highlightMove: 1,
    },
    play: {
      enablePremove: 1,
    },
  });

  const onOpenEditSetting = (isOpen: boolean) => {
    setIsOpenEditSetting(isOpen);
  };

  return (
    <SettingContext.Provider
      value={{
        mode,
        setting,
        onSetting: setSetting,
        isOpenEditSetting,
        onOpenEditSetting,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
};

export default SettingProvider;
