import { create } from "zustand";
import { KeyboardCharacter } from "../constants/characters";

interface ConfigState {
  targetSpeed: number;
  setTargetSpeed: (targetSpeed: number) => void;

  unlockedCharacters: KeyboardCharacter[];
}

export const useConfigStore = create<ConfigState>((set) => ({
  targetSpeed: 30,
  setTargetSpeed: (targetSpeed: number) => set({ targetSpeed }),

  unlockedCharacters: ["f", "j"],
}));
