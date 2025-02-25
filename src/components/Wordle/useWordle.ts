import { useEffect, useReducer, useState } from "react";
import WORD_LIST from "@/assets/dictionary.json";
import { useEventListener } from "@/hooks/useEventListener";
import { useRandomItem } from "@/hooks/useRandomItem";
import { useToast } from "../Toast/Toast";
import { useAnimationClass } from "@/hooks/useAnimationClass";
import { addGuess, checkGuess, checkLose, checkWin } from "@/gameLogic";

const initialState = {
  guesses: Array(5).fill("") as string[],
  currentGuess: "",
};

type WordleState = {
  guesses: string[];
  currentGuess: string;
};

type WordleAction =
  | { type: "SET_GUESS"; payload: string }
  | { type: "SUBMIT_GUESS" }
  | { type: "RESET" };

const wordleReducer = (state: WordleState, action: WordleAction) => {
  switch (action.type) {
    case "SET_GUESS":
      return { ...state, currentGuess: action.payload };
    case "SUBMIT_GUESS": {
      return {
        ...state,
        guesses: addGuess(state.guesses, state.currentGuess),
        currentGuess: "",
      };
    }
    case "RESET": {
      return { ...initialState };
    }
    default:
      return state;
  }
};

export const useWordle = () => {
  const [showInstructiionsDialog, setShowInstructionsDialog] = useState(true);
  const [state, dispatch] = useReducer(wordleReducer, initialState);
  const [wordOfTheDay, resetWord] = useRandomItem(WORD_LIST);
  const { showToast } = useToast();
  const { triggerAnimation, nodeRef: animatedNodeRef } =
    useAnimationClass<HTMLDivElement>();

  useEffect(() => {
    if (checkWin(state.guesses, wordOfTheDay)) {
      showToast("You have won! 🎉", "success");
    } else if (checkLose(state.guesses)) {
      showToast(
        "You ran out of guesses, restart the game and try again!",
        "error",
      );
    }
  }, [state.guesses]);

  useEventListener(
    document,
    "keydown",
    (e: KeyboardEvent) => {
      if (
        checkWin(state.guesses, wordOfTheDay) ||
        checkLose(state.guesses) ||
        showInstructiionsDialog
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
    [state, showInstructiionsDialog],
  );

  return {
    state,
    dispatch,
    wordOfTheDay,
    resetWord,
    animatedNodeRef,
    showInstructiionsDialog,
    setShowInstructionsDialog,
  };
};
