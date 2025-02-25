import { checkGuess } from "./gameLogic";

describe("Game Logic", () => {
  describe("checkGuess", () => {
    it("should return all correct for a perfect match", () => {
      expect(checkGuess("react", "react")).toEqual([
        "correct",
        "correct",
        "correct",
        "correct",
        "correct",
      ]);
    });

    it("should return all absent for no matches", () => {
      expect(checkGuess("abcde", "fghij")).toEqual([
        "absent",
        "absent",
        "absent",
        "absent",
        "absent",
      ]);
    });

    it("should handle present letters", () => {
      expect(checkGuess("react", "trace")).toEqual([
        "present",
        "present",
        "correct",
        "correct",
        "present",
      ]);
    });

    it("should handle a mix of correct, present, and absent", () => {
      expect(checkGuess("slate", "stale")).toEqual([
        "correct",
        "present",
        "correct",
        "present",
        "correct",
      ]);
      expect(checkGuess("boost", "robot")).toEqual([
        "present",
        "correct",
        "present",
        "absent",
        "correct",
      ]);
    });

    it("should handle duplicate letters correctly", () => {
      expect(checkGuess("apple", "paper")).toEqual([
        "present",
        "present",
        "correct",
        "absent",
        "present",
      ]);
      expect(checkGuess("guess", "esses")).toEqual([
        "absent",
        "absent",
        "present",
        "present",
        "correct",
      ]);
      expect(checkGuess("otter", "water")).toEqual([
        "absent",
        "absent",
        "correct",
        "correct",
        "correct",
      ]);
    });

    it("should prioritize correct positions for duplicates", () => {
      expect(checkGuess("hello", "pilot")).toEqual([
        "absent",
        "absent",
        "correct",
        "absent",
        "present",
      ]);

      expect(checkGuess("speed", "sweet")).toEqual([
        "correct",
        "absent",
        "correct",
        "correct",
        "absent",
      ]);
    });

    it("should handle triple duplicates correctly", () => {
      expect(checkGuess("tttwo", "letter")).toEqual([
        "present",
        "absent",
        "correct",
        "absent",
        "absent",
      ]);
    });
  });
});
