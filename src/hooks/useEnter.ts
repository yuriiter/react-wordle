import { useEventListener } from "./useEventListener";

export const useEnter = (handler: () => void, deps?: unknown[]) =>
  useEventListener(document, "keydown", handler, deps);
