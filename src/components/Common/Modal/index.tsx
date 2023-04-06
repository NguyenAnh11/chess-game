import { Box } from "@chakra-ui/react";
import css from "./modal.module.css";
import { ReactNode, useRef, useEffect } from "react";

type ModalProps = {
  content: ReactNode;
  footer: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export default function Modal({
  isOpen,
  onClose,
  content,
  footer,
}: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref.current]);

  return isOpen ? (
    <Box className={css.modal_container}>
      <Box className={css.modal_bg} />
      <Box ref={ref} className={css.modal_content}>
        {content}
        <Box className={css.modal_footer}>{footer}</Box>
      </Box>
    </Box>
  ) : null;
}
