import { makeAutoObservable } from "mobx";
import { getSavedState, saveState } from "../utils/persistentStorage";

class StatsStore {
  score = 0;
  topScore = getSavedState("topScore", 0);
  streakWithoutMistake = 0;
  longestStreakWithoutMistake = getSavedState("longestStreakWithoutMistake", 0);

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
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
