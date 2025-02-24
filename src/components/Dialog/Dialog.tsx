import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useEventListener } from "@/hooks/useEventListener";

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
