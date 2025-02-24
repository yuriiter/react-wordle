import wordleLogo from "@/assets/img/wordle-logo.png";
import { GAME_STATUS } from "@/constants";
import { useEnter } from "@/hooks/useEnter";
import { useGameState } from "@/store/GameState";

export const Starting = () => {
  const { dispatch } = useGameState();

  const startTheGame = () =>
    dispatch({ type: "SET_STATUS", payload: GAME_STATUS.PLAYING });

  useEnter(startTheGame, []);

  return (
    <section className="section start-section">
      <img src={wordleLogo} className="start-section__img" alt="Wordle Logo" />
      <h2 className="start-section__title">Wordle</h2>
      <p className="start-section__par">
        Get 6 chances to guess a 5-letter word.
      </p>
      <button className="button start-section__btn" onClick={startTheGame}>
        Start the game!
        <span className="inline-keys">Enter</span>
      </button>
    </section>
  );
};
