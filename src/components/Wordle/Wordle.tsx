import { useWordle } from "./hooks/useWordle";
import { getCurrentRow } from "@/gameLogic";
import { InstructionsDialog } from "./InstructionsDialog";
import { Buttons } from "./Buttons";
import { Captions } from "./Captions";
import { Row } from "./Row";

export const Wordle = () => {
  const {
    state,
    wordOfTheDay,
    animatedNodeRef,
    showInstructionsDialog,
    setShowInstructionsDialog,
    restartGame,
    revealWord,
  } = useWordle();

  const currentInputGuess = getCurrentRow(state.guesses);

  return (
    <>
      <section className="section">
        <div className="wordle-container">
          <Captions />
          <div className="wordle-grid">
            {state.guesses.map((guess, guessIndex) => (
              <Row
                currentInputGuess={currentInputGuess}
                guessIndex={guessIndex}
                guess={guess}
                animatedNodeRef={animatedNodeRef}
                wordOfTheDay={wordOfTheDay}
                state={state}
                key={guessIndex}
              />
            ))}
          </div>
          <Buttons
            restartGame={restartGame}
            revealWord={revealWord}
            setShowInstructionsDialog={setShowInstructionsDialog}
          />
        </div>
      </section>
      <InstructionsDialog
        showInstructionsDialog={showInstructionsDialog}
        setShowInstructionsDialog={setShowInstructionsDialog}
      />
    </>
  );
};
