import { IconType } from "react-icons";
import { Icon as I } from "@chakra-ui/react";
import css from "./icon.module.css";

type IconProps = {
  icon: IconType;
  style?: React.CSSProperties;
};

export default function Icon({ icon, style }: IconProps) {
  return <I style={style} as={icon} className={css.icon} />;
}
