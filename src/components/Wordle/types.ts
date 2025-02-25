export type WordleState = {
  guesses: string[];
  currentGuess: string;
};

export type WordleAction =
  | { type: "SET_GUESS"; payload: string }
  | { type: "SUBMIT_GUESS" }
  | { type: "RESET" };
