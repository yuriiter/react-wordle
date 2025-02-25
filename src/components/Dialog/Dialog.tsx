import React, { useState, useEffect, MouseEvent, useRef } from "react";
import { X } from "lucide-react";
import { useEventListener } from "@/hooks/useEventListener";
import { CSSTransition } from "react-transition-group";

interface DialogProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  defaultOpen?: boolean;
}

export const Dialog = ({
  children,
  isOpen: controlledIsOpen,
  onClose,
  defaultOpen = false,
}: DialogProps) => {
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

  return (
    <CSSTransition
      in={isOpen}
      nodeRef={dialogRef}
      unmountOnExit
      classNames="dialog"
      addEndListener={() => {}}
      appear
    >
      <div
        ref={dialogRef}
        className="dialog-overlay"
        onClick={handleClickOutside}
      >
        <div className="dialog">
          <button onClick={handleClose} className="dialog-close">
            <X size={20} />
          </button>
          <div className="dialog-content">{children}</div>
        </div>
      </div>
    </CSSTransition>
  );
};
