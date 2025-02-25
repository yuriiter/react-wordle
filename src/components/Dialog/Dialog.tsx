import { ReactNode } from "react";
import { X } from "lucide-react";
import { CSSTransition } from "react-transition-group";
import { useDialogSetup } from "./useDialogSetup";

interface DialogProps {
  children: ReactNode;
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
  const { handleClickOutside, handleClose, isOpen, dialogRef } = useDialogSetup(
    { controlledIsOpen, defaultOpen, onClose },
  );

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
