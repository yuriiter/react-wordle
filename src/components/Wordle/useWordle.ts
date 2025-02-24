import { useReducer, useEffect } from "react";
import WORD_LIST from "@/assets/dictionary.json";
import { useEventListener } from "@/hooks/useEventListener";

const wordOfTheDay = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];

const initialState = {
  guesses: Array(6).fill(""),
  currentGuess: "",
};

type WordleState = {
  guesses: string[];
  currentGuess: string;
};

type WordleAction =
  | { type: "SET_GUESS"; payload: string }
  | { type: "SUBMIT_GUESS" };

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
    default:
      return state;
  }
};

export const useWordle = () => {
  const [state, dispatch] = useReducer(wordleReducer, initialState);

  useEventListener(
    document,
    "keydown",
    (e: KeyboardEvent) => {
      // if (state.gameOver) return;
      if (e.key === "Enter" && state.currentGuess.length === 5) {
        dispatch({ type: "SUBMIT_GUESS" });
      } else if (e.key === "Backspace") {
        dispatch({
          type: "SET_GUESS",
          payload: state.currentGuess.slice(0, -1),
        });
      } else if (state.currentGuess.length < 5 && /^[a-z]$/.test(e.key)) {
        dispatch({ type: "SET_GUESS", payload: state.currentGuess + e.key });
      }
    },
    [state],
  );

  return { state, dispatch, wordOfTheDay };
};
