import { useEffect, useState } from "react";
import WORD_LIST from "@/assets/dictionary.json";
import { useRandomItem } from "@/hooks";
import { useAnimationClass } from "@/hooks";
import { checkLose, checkWin } from "@/gameLogic";
import { useGameState } from "@/store";
import { GAME_STATUS } from "@/constants";
import { useToast } from "@/components/Toast";
import { useWordleReducer } from "./useWordleReducer";
import { useKeyListeners } from "./useKeyListeners";

export const useWordle = () => {
  const [showInstructionsDialog, setShowInstructionsDialog] = useState(true);
  const [state, dispatch] = useWordleReducer();
  const [wordOfTheDay, resetWord] = useRandomItem(WORD_LIST);
  const { showToast } = useToast();
  const { triggerAnimation, nodeRef: animatedNodeRef } =
    useAnimationClass<HTMLDivElement>();
  const { dispatch: gameStateDispatch } = useGameState();

  useEffect(() => {
    if (checkWin(state.guesses, wordOfTheDay)) {
      showToast("You have won! 🎉", "success");
    } else if (checkLose(state.guesses, wordOfTheDay)) {
      showToast(
        "You ran out of guesses, restart the game and try again!",
        "error",
      );
    }
  }, [state.guesses]);

  const restartGame = () => {
    resetWord();
    gameStateDispatch({ type: "SET_STATUS", payload: GAME_STATUS.STARTING });
  };

  const revealWord = () =>
    showToast(`Word of the day: ${wordOfTheDay}`, "info");

  useKeyListeners({
    restartGame,
    revealWord,
    showInstructionsDialog,
    setShowInstructionsDialog,
    wordleState: state,
    wordleDispatch: dispatch,
    wordOfTheDay,
    triggerAnimation,
  });

  return {
    state,
    wordOfTheDay,
    animatedNodeRef,
    showInstructionsDialog,
    setShowInstructionsDialog,
    restartGame,
    revealWord,
  };
};
