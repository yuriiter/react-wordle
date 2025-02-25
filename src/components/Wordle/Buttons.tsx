import { Dispatch, SetStateAction } from "react";

type ButtonsProps = {
  restartGame: () => void;
  revealWord: () => void;
  setShowInstructionsDialog: Dispatch<SetStateAction<boolean>>;
};

export const Buttons = ({
  restartGame,
  revealWord,
  setShowInstructionsDialog,
}: ButtonsProps) => {
  return (
    <div className="wordle-container__buttons">
      <button onClick={restartGame} className="button button--secondary">
        Restart
        <span className="inline-keys">Shift + R</span>
      </button>
      <button onClick={revealWord} className="button button--secondary">
        Word reveal
        <span className="inline-keys">Shift + W</span>
      </button>
      <button
        className="button-question-mark button--icon button button--secondary"
        onClick={() => setShowInstructionsDialog(true)}
      >
        ?
      </button>
    </div>
  );
};
