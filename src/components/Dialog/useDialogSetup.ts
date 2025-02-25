import { useState, useEffect, MouseEvent, useRef } from "react";
import { useEventListener } from "@/hooks";

type UseDialogSetupParams = {
  controlledIsOpen?: boolean;
  defaultOpen?: boolean;
  onClose?: () => void;
};

export const useDialogSetup = ({
  controlledIsOpen,
  defaultOpen,
  onClose,
}: UseDialogSetupParams) => {
  const dialogRef = useRef(null);
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  useEventListener(
    document,
    "keydown",
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    },
    [isOpen],
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("dialog-overlay")) handleClose();
  };

  return {
    handleClickOutside,
    handleClose,
    isOpen,
    dialogRef,
  };
};
