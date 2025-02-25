import { useEventListener } from "@/hooks";
import { checkLose, checkWin } from "@/gameLogic";
import { ActionDispatch, Dispatch, SetStateAction } from "react";
import { WordleAction, WordleState } from "../types";
import { useToast } from "@/components/Toast";

type UseKeyListenersParams = {
  restartGame: () => void;
  revealWord: () => void;
  showInstructionsDialog: boolean;
  setShowInstructionsDialog: Dispatch<SetStateAction<boolean>>;
  wordleState: WordleState;
  wordleDispatch: ActionDispatch<[action: WordleAction]>;
  wordOfTheDay: string;
  triggerAnimation: (className: string) => void;
};

export const useKeyListeners = ({
  restartGame,
  revealWord,
  setShowInstructionsDialog,
  wordleState: state,
  wordleDispatch: dispatch,
  wordOfTheDay,
  showInstructionsDialog,
  triggerAnimation,
}: UseKeyListenersParams) => {
  const { showToast } = useToast();

  useEventListener(
    document,
    "keydown",
    (e) => {
      if (e.shiftKey && e.key === "R") restartGame();
      if (e.shiftKey && e.key === "W") revealWord();
      if (e.key === "?") setShowInstructionsDialog((p) => !p);
    },
    [],
  );

  useEventListener(
    document,
    "keydown",
    (e: KeyboardEvent) => {
      if (
        checkWin(state.guesses, wordOfTheDay) ||
        checkLose(state.guesses) ||
        showInstructionsDialog
      )
        return;
      if (e.key === "Enter") {
        if (state.currentGuess.length !== 5) {
          triggerAnimation("shaking-row");
          showToast("Not enough letters", "error");
        } else dispatch({ type: "SUBMIT_GUESS" });
      } else if (e.key === "Backspace") {
        dispatch({
          type: "SET_GUESS",
          payload: state.currentGuess.slice(0, -1),
        });
      } else if (e.shiftKey || e.altKey || e.ctrlKey) {
        void 0;
      } else if (state.currentGuess.length < 5 && /^[a-z]$/.test(e.key)) {
        dispatch({ type: "SET_GUESS", payload: state.currentGuess + e.key });
      }
    },
    [state, showInstructionsDialog],
  );
};
