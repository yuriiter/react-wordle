import { checkGuess } from "./Wordle";

describe("checkGuess", () => {
  it("should handle correct letters", () => {
    expect(checkGuess("water", "water")).toEqual([
      "correct",
      "correct",
      "correct",
      "correct",
      "correct",
    ]);
  });

  it("should handle present letters", () => {
    expect(checkGuess("otter", "water")).toEqual([
      "absent",
      "present",
      "present",
      "absent",
      "correct",
    ]);
  });

  it("should handle words with duplicate letters correctly (yellow highlight rule)", () => {
    expect(checkGuess("otter", "water")).toEqual([
      "absent",
      "present",
      "present",
      "absent",
      "correct",
    ]);
  });
});
