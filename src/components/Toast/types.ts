export type ToastType = "success" | "error" | "info" | "warning";
export type ToastData = {
  id: string | number;
  message: string;
  type: ToastType;
};

export type ToastContextType = {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
};
