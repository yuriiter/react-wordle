import { cn } from "@/utils";
import { useWordle } from "./useWordle";
import "./Wordle.css";

export const Wordle = () => {
  const { state, wordOfTheDay } = useWordle();

  const getTileClass = (
    letter: string,
    guessIndex: number,
    letterIndex: number,
  ) => {
    // if (guessIndex > state.guesses.findIndex((guess) => guess === ""))
    //   return "";
    // if (guessIndex === state.guesses.findIndex((guess) => guess === ""))
    //   return "";

    const correctLetter = wordOfTheDay[letterIndex];
    const letterCountInWord = wordOfTheDay
      .split("")
      .filter((l) => l === letter).length;
    const letterCountInGuess = state.guesses[guessIndex]
      .split("")
      .filter((l: string) => l === letter).length;

    if (letter === correctLetter) {
      return "correct";
    } else if (
      wordOfTheDay.includes(letter) &&
      letterCountInGuess <= letterCountInWord
    ) {
      return "present";
    } else {
      return "absent";
    }
  };

  const getCurrentRow = () => {
    return state.guesses.findIndex((guess) => guess === "");
  };

  return (
    <div className="wordle-container">
      <h1>Wordle</h1>
      <p>Guess the 5 letter word. You have 6 tries.</p>
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
                  "wordle-title",
                  getTileClass(letter, guessIndex, letterIndex),
                )}
                key={letterIndex}
              >
                {letter}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
