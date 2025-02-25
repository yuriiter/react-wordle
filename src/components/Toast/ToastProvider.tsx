import { createContext, useState, useCallback, PropsWithChildren } from "react";
import { Toast } from "./Toast";
import { ToastType, ToastData, ToastContextType } from "./types";
import { v4 as uuid } from "uuid";

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = useCallback(
    (message: string, type: ToastType = "info", duration = 2500) => {
      const id = uuid();
      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, duration);
    },
    [],
  );

  const removeToast = useCallback((id: number | string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
