import { cn } from "@/utils";
import { useWordle } from "./useWordle";
import "./Wordle.css";
import { CSSProperties } from "react";

export const Wordle = () => {
  const { state, wordOfTheDay } = useWordle();

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

  return (
    <section className="section">
      <div className="wordle-container">
        <h1>Wordle</h1>
        <p>
          Guess the 5 letter word. You have 6 tries. Press ENTER to submit a
          guess.
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
      </div>
    </section>
  );
};
