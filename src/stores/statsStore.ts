import { create } from "zustand";
import { KeyboardCharacter } from "../constants/characters";

interface StatsState {
  performance: Partial<Record<KeyboardCharacter, number>>;
}

export const useStatsStore = create<StatsState>(() => ({
  performance: {},
}));
