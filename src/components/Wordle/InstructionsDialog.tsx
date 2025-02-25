import { Dispatch, SetStateAction } from "react";
import { Dialog } from "../Dialog";

type InstructionsDialogProps = {
  showInstructionsDialog: boolean;
  setShowInstructionsDialog: Dispatch<SetStateAction<boolean>>;
};

export const InstructionsDialog = ({
  showInstructionsDialog,
  setShowInstructionsDialog,
}: InstructionsDialogProps) => {
  return (
    <Dialog
      isOpen={showInstructionsDialog}
      onClose={() => setShowInstructionsDialog(false)}
    >
      <h3>How To Play</h3>
      <p>Guess the Wordle in 5 tries.</p>
      <ul className="instructions__list">
        <li>Each guess must be a valid 5-letter word.</li>
        <li>
          The color of the tiles will change to indicate how close your guess is
          to the word.
        </li>
        <li>
          A green tile means you guessed both the letter and its position
          correctly.
        </li>
        <li>
          A yellow tile means you guessed the letter correctly, but not its
          position.
        </li>
        <li className="bold">To input a letter, just press it on keyboard!</li>
      </ul>
    </Dialog>
  );
};
