import { useGameState } from "@/store/GameState";

export const GameStatus = () => {
  const { state, dispatch } = useGameState();
  return <>State</>;
};
