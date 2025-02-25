export const checkGuess = (guess: string, word: string): string[] => {
  const result: string[] = ["absent", "absent", "absent", "absent", "absent"];

  const wordLetters = word.split("");

  for (let i = 0; i < 5; i++) {
    if (guess[i] === word[i]) {
      result[i] = "correct";
      wordLetters.splice(wordLetters.indexOf(guess[i]), 1);
    }
  }

  for (let i = 0; i < 5; i++) {
    if (result[i] === "absent" && wordLetters.includes(guess[i])) {
      result[i] = "present";
      wordLetters.splice(wordLetters.indexOf(guess[i]), 1);
    }
  }

  return result;
};

export const addGuess = (guesses: string[], currentGuess: string): string[] => {
  const newGuesses = [...guesses];
  newGuesses[getCurrentRow(guesses)] = currentGuess;
  return newGuesses;
};

export const checkWin = (guesses: string[], wordOfTheDay: string): boolean => {
  return guesses.some((guess) => guess === wordOfTheDay);
};

export const checkLose = (guesses: string[], wordOfTheDay: string): boolean => {
  return (
    guesses.every((guess) => guess !== "") && !checkWin(guesses, wordOfTheDay)
  );
};

export const getTileClass = (
  letter: string,
  guessIndex: number,
  letterIndex: number,
  guesses: string[],
  wordOfTheDay: string,
): string => {
  const firstEmptyRowIndex = getCurrentRow(guesses);

  if (guessIndex > firstEmptyRowIndex && firstEmptyRowIndex !== -1) return "";

  if (guessIndex === firstEmptyRowIndex) {
    return letter !== " " ? "current-input" : "";
  }

  const guessResult = checkGuess(guesses[guessIndex], wordOfTheDay);

  switch (guessResult[letterIndex]) {
    case "correct":
      return "reveal-tile correct";
    case "present":
      return "reveal-tile present";
    default:
      return "reveal-tile absent";
  }
};

export const getCurrentRow = (guesses: string[]) => {
  return guesses.findIndex((guess) => guess === "");
};
