import { cn } from "@/utils";
import { useWordle } from "./useWordle";
import "./Wordle.css";
import { CSSProperties } from "react";
import { useToast } from "../Toast/Toast";
import { useGameState } from "@/store/GameState";
import { GAME_STATUS } from "@/constants";

export const Wordle = () => {
  const { state, dispatch, wordOfTheDay, resetWord } = useWordle();
  const { dispatch: gameStateDispatch } = useGameState();
  const { showToast } = useToast();

  const getTileClass = (
    letter: string,
    guessIndex: number,
    letterIndex: number,
  ) => {
    if (guessIndex > state.guesses.findIndex((guess) => guess === ""))
      return "";

    if (guessIndex === state.guesses.findIndex((guess) => guess === "")) {
      if (letter !== " ") return "current-input";
      return "";
    }

    const correctLetter = wordOfTheDay[letterIndex];
    const letterCountInWord = wordOfTheDay
      .split("")
      .filter((l) => l === letter).length;
    const letterCountInGuess = state.guesses[guessIndex]
      .split("")
      .filter((l: string) => l === letter).length;

    if (letter === correctLetter) {
      return "reveal-tile correct";
    } else if (
      wordOfTheDay.includes(letter) &&
      letterCountInGuess <= letterCountInWord
    ) {
      return "reveal-tile present";
    } else {
      return "reveal-tile absent";
    }
  };

  const getCurrentRow = () => {
    return state.guesses.findIndex((guess) => guess === "");
  };

  const restartGame = () => {
    resetWord();
    dispatch({ type: "RESET" });
    gameStateDispatch({ type: "SET_STATUS", payload: GAME_STATUS.STARTING });
  };

  const revealWord = () =>
    showToast(`Word of the day: ${wordOfTheDay}`, "info");

  return (
    <section className="section">
      <div className="wordle-container">
        <h1>Wordle</h1>
        <p>
          Guess the 5 letter word. You have 5 tries. <br /> Press{" "}
          <span className="bold">ENTER</span> to submit a guess and{" "}
          <span className="bold">Backspace</span> to remove a letter.
        </p>
        <div className="wordle-grid">
          {state.guesses.map((guess, guessIndex) => (
            <div className="wordle-row" key={guessIndex}>
              {(
                Array.from(
                  guessIndex === getCurrentRow()
                    ? state.currentGuess.padEnd(5, " ")
                    : guess.padEnd(5, " "),
                ) as string[]
              ).map((letter, letterIndex) => (
                <div
                  className={cn(
                    "wordle-tile",
                    getTileClass(letter, guessIndex, letterIndex),
                  )}
                  style={{ "--reveal-tile-i": letterIndex } as CSSProperties}
                  key={letterIndex}
                >
                  <div className="wordle-tile__front">{letter}</div>
                  <div className="wordle-tile__back">{letter}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="wordle-container__buttons">
          <button onClick={restartGame} className="button button--secondary">
            Restart
          </button>
          <button onClick={revealWord} className="button button--secondary">
            Reveal the word
          </button>
        </div>
      </div>
    </section>
  );
};
