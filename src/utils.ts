export const cn = (...classNames: (string | undefined | null | boolean)[]) =>
  classNames
    .filter(
      (className) => typeof className === "string" && className.length > 0,
    )
    .join(" ");

export const getRandomItem = <T>(array: T[]) =>
  array[Math.floor(Math.random() * array.length)];
