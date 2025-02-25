import { useEffect } from "react";

type ElementType = HTMLElement | Window | Document | null | undefined;

type EventListenerOptions = boolean | AddEventListenerOptions;

type EventMapType<T> = T extends keyof WindowEventMap
  ? WindowEventMap[T]
  : T extends keyof HTMLElementEventMap
    ? HTMLElementEventMap[T]
    : T extends keyof DocumentEventMap
      ? DocumentEventMap[T]
      : Event;

/**
 * A custom React hook for managing event listeners with TypeScript support.
 *
 * @param element - The element to attach the event listener to
 * @param eventName - The name of the event to listen for
 * @param handler - The callback function to execute when the event is triggered
 * @param options - Optional event listener options or dependencies array
 * @param deps - Optional dependencies array if options parameter is used
 *
 * @example
 * // Basic usage
 * useEventListener(window, 'resize', handleResize);
 *
 * // With options
 * useEventListener(element, 'click', handleClick, { passive: true });
 *
 * // With dependencies
 * useEventListener(window, 'scroll', handleScroll, [scrollEnabled]);
 *
 * // With both options and dependencies
 * useEventListener(document, 'keydown', handleKeydown, { passive: true }, [isEnabled]);
 */
export const useEventListener = <
  K extends
    | keyof WindowEventMap
    | keyof HTMLElementEventMap
    | keyof DocumentEventMap,
>(
  element: ElementType,
  eventName: K,
  handler: (event: EventMapType<K>) => void,
  options?: EventListenerOptions | unknown[] | undefined,
  deps?: unknown[],
): void => {
  const isOptionsDeps = Array.isArray(options);
  const eventOptions = isOptionsDeps ? undefined : options;
  const dependencies = isOptionsDeps ? options : deps || [];

  useEffect(() => {
    const targetElement = element;

    if (!targetElement || !targetElement.addEventListener) {
      return;
    }

    const handlerWrapper = ((event: Event) => {
      handler(event as EventMapType<K>);
    }) as EventListener;

    targetElement.addEventListener(eventName, handlerWrapper, eventOptions);

    return () => {
      targetElement.removeEventListener(
        eventName,
        handlerWrapper,
        eventOptions,
      );
    };
  }, [...dependencies]);
};
