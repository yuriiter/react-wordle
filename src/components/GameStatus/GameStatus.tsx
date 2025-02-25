import { useGameState } from "@/store";
import { GAME_STATUS } from "@/constants";
import { Starting } from "./Starting";

export const GameStatus = () => {
  const { state } = useGameState();

  if (state.gameStatus === GAME_STATUS.PLAYING) return;
  if (state.gameStatus === GAME_STATUS.STARTING) return <Starting />;

  return null;
};
