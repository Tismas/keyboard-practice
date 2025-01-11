import { create } from "zustand";
import { KeyboardCharacter, lowerCaseLetters } from "../constants/characters";
import { words } from "./words";

interface ConfigState {
  targetSpeed: number;
  setTargetSpeed: (targetSpeed: number) => void;
  unlockedCharacters: KeyboardCharacter[];
  wordsPool: string[];
  toggleUnlocked: (character: KeyboardCharacter) => void;
}

const getWordsPool = (unlockedCharacters: string[]): string[] => {
  console.log("Calculating words pool...");
  return words.filter((word) =>
    word.split("").every((letter) => unlockedCharacters.includes(letter))
  );
};

const initialUnlockedCharacters: KeyboardCharacter[] = [...lowerCaseLetters];

export const useConfigStore = create<ConfigState>((set, get) => ({
  targetSpeed: 180,
  setTargetSpeed: (targetSpeed) => set({ targetSpeed }),
  unlockedCharacters: initialUnlockedCharacters,
  wordsPool: getWordsPool(initialUnlockedCharacters),

  toggleUnlocked: (character) => {
    const state = get();
    const unlockedCharacters = [...state.unlockedCharacters];

    if (unlockedCharacters.includes(character)) {
      unlockedCharacters.splice(unlockedCharacters.indexOf(character), 1);
    } else {
      unlockedCharacters.push(character);
    }

    set({
      unlockedCharacters,
      wordsPool: getWordsPool(unlockedCharacters),
    });
  },
}));
