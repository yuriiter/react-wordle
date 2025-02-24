import { useGameState } from "@/store/GameState";
import { GAME_STATUS } from "@/constants";
import { Starting } from "./Starting";
import { Ended } from "./Ended";

export const GameStatus = () => {
  const { state } = useGameState();

  if (state.gameStatus === GAME_STATUS.PLAYING) return;
  if (state.gameStatus === GAME_STATUS.STARTING) return <Starting />;
  if (state.gameStatus === GAME_STATUS.ENDED) return <Ended />;

  return null;
};
