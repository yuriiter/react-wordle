import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import "./Dialog.css";

interface DialogProps {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  defaultOpen?: boolean;
}

const Dialog = ({
  children,
  isOpen: controlledIsOpen,
  onClose,
  defaultOpen = false,
}: DialogProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
  const isOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

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

  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-backdrop" />
      <div className="dialog">
        <button onClick={handleClose} className="dialog-close">
          <X size={20} />
        </button>
        <div className="dialog-content">{children}</div>
      </div>
    </div>
  );
};

export default Dialog;
