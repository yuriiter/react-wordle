import { AnimationEvent, useCallback, useState } from "react";

export const useAnimationClass = () => {
  const [animation, setAnimation] = useState<{
    className: string;
    value?: unknown;
  } | null>(null);

  const triggerAnimation = useCallback((className: string, value?: unknown) => {
    setAnimation({ className, value });
  }, []);

  const handleAnimationEnd = useCallback(
    (event: AnimationEvent<HTMLElement>) => {
      if (
        animation &&
        event.target instanceof HTMLElement &&
        event.target.classList.contains(animation.className)
      ) {
        setAnimation(null);
      }
    },
    [animation],
  );

  return { animation, triggerAnimation, handleAnimationEnd };
};
