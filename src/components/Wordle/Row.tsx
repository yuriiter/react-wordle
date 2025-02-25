import { CSSProperties, Ref } from "react";
import { WordleState } from "./types";
import { getCurrentRow, getTileClass } from "@/gameLogic";
import { cn } from "@/utils";

type RowProps = {
  currentInputGuess: number;
  guessIndex: number;
  guess: string;
  animatedNodeRef: Ref<HTMLDivElement>;
  state: WordleState;
  wordOfTheDay: string;
};

export const Row = ({
  currentInputGuess,
  guessIndex,
  guess,
  animatedNodeRef,
  wordOfTheDay,
  state,
}: RowProps) => {
  return (
    <div
      ref={currentInputGuess === guessIndex ? animatedNodeRef : undefined}
      className="wordle-row"
      key={guessIndex}
    >
      {(
        Array.from(
          guessIndex === getCurrentRow(state.guesses)
            ? state.currentGuess.padEnd(5, " ")
            : guess.padEnd(5, " "),
        ) as string[]
      ).map((letter, letterIndex) => (
        <div
          className={cn(
            "wordle-tile",
            getTileClass(
              letter,
              guessIndex,
              letterIndex,
              state.guesses,
              wordOfTheDay,
            ),
          )}
          style={{ "--reveal-tile-i": letterIndex } as CSSProperties}
          key={letterIndex}
        >
          <div className="wordle-tile__front">{letter}</div>
          <div className="wordle-tile__back">{letter}</div>
        </div>
      ))}
    </div>
  );
};
