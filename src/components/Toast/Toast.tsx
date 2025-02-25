import { X } from "lucide-react";
import { ToastType } from "./types";

type ToastProps = {
  toast: {
    id: number;
    message: string;
    type: ToastType;
  };
  onRemove: (id: number) => void;
};

export const Toast = ({ toast, onRemove }: ToastProps) => (
  <div key={toast.id} className={`toast toast-${toast.type}`}>
    <span>{toast.message}</span>
    <button className="toast-close" onClick={() => onRemove(toast.id)}>
      <X size={16} />
    </button>
  </div>
);
