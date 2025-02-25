import { X } from "lucide-react";
import { ToastData } from "./types";

type ToastProps = {
  toast: ToastData;
  onRemove: (id: number | string) => void;
};

export const Toast = ({ toast, onRemove }: ToastProps) => (
  <div key={toast.id} className={`toast toast-${toast.type}`}>
    <span>{toast.message}</span>
    <button className="toast-close" onClick={() => onRemove(toast.id)}>
      <X size={16} />
    </button>
  </div>
);
