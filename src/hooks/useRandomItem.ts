import { getRandomItem } from "@/utils";
import { useCallback, useState } from "react";

export const useRandomItem = <T>(array: T[]): [T, () => void] => {
  const [randomItem, setRandomItem] = useState(getRandomItem(array));

  const reset = useCallback(() => setRandomItem(getRandomItem(array)), []);

  return [randomItem, reset];
};
