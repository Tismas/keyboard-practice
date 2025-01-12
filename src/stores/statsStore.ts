import { makeAutoObservable } from "mobx";
import { getSavedState, saveState } from "../utils/persistentStorage";
import { KeyboardCharacter } from "../constants/characters";

interface CharacterStats {
  correct: number;
  incorrect: number;
}

class StatsStore {
  score = 0;
  topScore = getSavedState("topScore", 0);
  streakWithoutMistake = 0;
  longestStreakWithoutMistake = getSavedState("longestStreakWithoutMistake", 0);
  characterStats: Record<KeyboardCharacter, CharacterStats> = getSavedState(
    "characterPerformance",
    {}
  );
  saveCharacterStatsTimeout: number | null = null;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  getWorstCharacters() {
    return Object.entries(this.characterStats)
      .map(([character, stats]) => ({
        character,
        correctPercentage:
          (stats.correct / (stats.correct + stats.incorrect)) * 100,
      }))
      .sort((a, b) => a.correctPercentage - b.correctPercentage)
      .slice(0, 3);
  }
  getBestCharacters() {
    return Object.entries(this.characterStats)
      .map(([character, stats]) => ({
        character,
        correctPercentage:
          (stats.correct / (stats.correct + stats.incorrect)) * 100,
      }))
      .sort((a, b) => b.correctPercentage - a.correctPercentage)
      .slice(0, 3);
  }

  handleIncorrectlyTyped(character: KeyboardCharacter) {
    this.handleCharacterStatChange(character, () => {
      this.characterStats[character].incorrect++;
    });
  }
  handleCorrectlyTyped(character: KeyboardCharacter) {
    this.handleCharacterStatChange(character, () => {
      this.characterStats[character].correct++;
    });
  }
  private handleCharacterStatChange(
    character: KeyboardCharacter,
    cb: VoidFunction
  ) {
    this.characterStats[character] ||= { correct: 0, incorrect: 0 };
    cb();

    if (this.saveCharacterStatsTimeout) {
      clearTimeout(this.saveCharacterStatsTimeout);
    }
    this.saveCharacterStatsTimeout = setTimeout(
      () => saveState("characterPerformance", this.characterStats),
      1000
    );
  }

  setScore(score: number) {
    this.score = Math.max(0, score);
    if (this.score > this.topScore) {
      this.topScore = score;
      saveState("topScore", score);
    }
  }

  setStreakWithoutMistake(streak: number) {
    this.streakWithoutMistake = streak;
    if (this.streakWithoutMistake > this.longestStreakWithoutMistake) {
      this.longestStreakWithoutMistake = this.streakWithoutMistake;
      saveState(
        "longestStreakWithoutMistake",
        this.longestStreakWithoutMistake
      );
    }
  }
}

export const statsStore = new StatsStore();
