import { makeAutoObservable } from "mobx";
import { getSavedState, saveState } from "../utils/persistentStorage";

class StatsStore {
  topScore = getSavedState("topScore", 0);

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setTopScore(score: number) {
    this.topScore = score;
    saveState("topScore", score);
  }
}

export const statsStore = new StatsStore();
