import { useEffect } from "react";

export const useTimeout = (
  callback: () => void,
  timeout: number,
  deps?: unknown[],
) => {
  useEffect(() => {
    const timeoutId = setTimeout(callback, timeout);

    return () => clearTimeout(timeoutId);
  }, deps);
};
