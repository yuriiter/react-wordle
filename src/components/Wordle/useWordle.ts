import { useReducer } from "react";
import WORD_LIST from "@/assets/dictionary.json";
import { useEventListener } from "@/hooks/useEventListener";
import { useRandomItem } from "@/hooks/useRandomItem";
import { useToast } from "../Toast/Toast";
import { useAnimationClass } from "@/hooks/useAnimationClass";

const wordOfTheDay = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];

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
      const newGuesses = [...state.guesses];
      newGuesses[newGuesses.findIndex((g) => g === "")] = state.currentGuess;
      return {
        ...state,
        guesses: newGuesses,
        currentGuess: "",
        gameOver:
          state.currentGuess === wordOfTheDay ||
          newGuesses.every((g) => g !== ""),
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
  const [state, dispatch] = useReducer(wordleReducer, initialState);
  const [wordOfTheDay, resetWord] = useRandomItem(WORD_LIST);
  const { showToast } = useToast();
  const {
    animation: shakeRowOnErrorAnimation,
    triggerAnimation,
    handleAnimationEnd: onRowShakeEnd,
  } = useAnimationClass();

  useEventListener(
    document,
    "keydown",
    (e: KeyboardEvent) => {
      // if (state.gameOver) return;
      if (e.key === "Enter") {
        if (state.currentGuess.length !== 5) {
          triggerAnimation(
            "shaking-row",
            state.guesses.findIndex((guess) => guess.length !== 5),
          );
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
    [state],
  );

  return {
    state,
    dispatch,
    wordOfTheDay,
    resetWord,
    shakeRowOnErrorAnimation,
    onRowShakeEnd,
  };
};
