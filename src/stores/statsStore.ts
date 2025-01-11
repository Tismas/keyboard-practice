import { makeAutoObservable } from "mobx";

class StatsStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
}

export const statsStore = new StatsStore();
