import { useCallback, useRef } from "react";

export const useAnimationClass = <T extends HTMLElement>() => {
  const nodeRef = useRef<T>(null);

  const activeAnimations = useRef<Set<string>>(new Set());

  const onAnimationEnd = (className: string) => (e: AnimationEvent) => {
    const target = e.target as HTMLElement;
    if (target) {
      target.classList.remove(className);
      activeAnimations.current.delete(className);
    }
  };

  const triggerAnimation = useCallback(
    (className: string) => {
      const { current: node } = nodeRef;
      if (!node) return;

      node.classList.remove(className);

      node.classList.add(className);
      node.addEventListener("animationend", onAnimationEnd(className), {
        once: true,
      });
      activeAnimations.current.add(className);
    },
    [nodeRef.current],
  );

  return {
    nodeRef,
    triggerAnimation,
  };
};
