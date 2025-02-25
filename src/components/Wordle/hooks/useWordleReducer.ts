import { addGuess } from "@/gameLogic";
import { useReducer } from "react";
import { WordleAction, WordleState } from "../types";

const initialState = {
  guesses: Array(5).fill("") as string[],
  currentGuess: "",
};

const wordleReducer = (
  state: WordleState,
  action: WordleAction,
): WordleState => {
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

export const useWordleReducer = () => useReducer(wordleReducer, initialState);
