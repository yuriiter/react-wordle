import { useGameState } from "@/store/GameState";
import { Wordle } from "./Wordle/Wordle";
import { GameStatus } from "./GameStatus/GameStatus";
import { GAME_STATUS } from "@/constants";

export const Container = () => {
  const { state } = useGameState();
  return (
    <>
      <GameStatus />
      {state.gameStatus === GAME_STATUS.PLAYING && (
        <>
          <Wordle />
        </>
      )}
    </>
  );
};
