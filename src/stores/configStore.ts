import { makeAutoObservable } from "mobx";
import {
  KeyboardCharacter,
  lowerCaseBottomRow,
  lowerCaseHomeRow,
  lowerCaseTopRow,
  symbols,
  upperCaseLetters,
  whiteSpace,
} from "../constants/characters";
import { words } from "../constants/words";
import { gameStore } from "./gameStore";
import { randomChoice } from "../utils/array";
import { getSavedState, saveState } from "../utils/persistentStorage";

class ConfigStore {
  targetSpeed = getSavedState("targetSpeed", 120);
  unlockedCharacters: KeyboardCharacter[] = getSavedState(
    "unlockedCharacters",
    ["f", "j"]
  );
  wordsPool: string[];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });

    this.wordsPool = this.getWordsPool();
  }

  toggleUnlocked(character: KeyboardCharacter) {
    if (this.unlockedCharacters.includes(character)) {
      this.unlockedCharacters.splice(
        this.unlockedCharacters.indexOf(character),
        1
      );
    } else {
      this.unlockedCharacters.push(character);
    }
    this.wordsPool = this.getWordsPool();

    localStorage.setItem(
      "unlockedCharacters",
      JSON.stringify(this.unlockedCharacters)
    );
  }

  setTargetSpeed(targetSpeed: number) {
    this.targetSpeed = targetSpeed;
    gameStore.currentSpeed = targetSpeed / 2;
    saveState("targetSpeed", this.targetSpeed);
  }

  get lockedHomeRow() {
    return lowerCaseHomeRow.filter(
      (letter) => !this.unlockedCharacters.includes(letter)
    );
  }
  get lockedTopRow() {
    return lowerCaseTopRow.filter(
      (letter) => !this.unlockedCharacters.includes(letter)
    );
  }
  get lockedBottomRow() {
    return lowerCaseBottomRow.filter(
      (letter) => !this.unlockedCharacters.includes(letter)
    );
  }
  get lockedUppercaseLetters() {
    return upperCaseLetters.filter(
      (letter) => !this.unlockedCharacters.includes(letter)
    );
  }
  get lockedSymbols() {
    return symbols.filter(
      (letter) => !this.unlockedCharacters.includes(letter)
    );
  }
  get lockedWhiteSpace() {
    return whiteSpace.filter(
      (letter) => !this.unlockedCharacters.includes(letter)
    );
  }

  unlockNextCharacter() {
    if (this.lockedHomeRow.length > 0) {
      this.toggleUnlocked(randomChoice(this.lockedHomeRow));
      return;
    }
    if (this.lockedBottomRow.length > 0) {
      this.toggleUnlocked(randomChoice(this.lockedBottomRow));
      return;
    }
    if (this.lockedTopRow.length > 0) {
      this.toggleUnlocked(randomChoice(this.lockedTopRow));
      return;
    }
    if (this.lockedUppercaseLetters.length > 0) {
      this.toggleUnlocked(randomChoice(this.lockedUppercaseLetters));
      return;
    }
    if (this.lockedSymbols.length > 0) {
      this.toggleUnlocked(randomChoice(this.lockedSymbols));
      return;
    }
    if (this.lockedWhiteSpace.length > 0) {
      this.toggleUnlocked(randomChoice(this.lockedWhiteSpace));
      return;
    }
  }

  private getWordsPool(): string[] {
    console.log("Calculating words pool...");
    return words.filter((word) =>
      word
        .split("")
        .every((letter) =>
          this.unlockedCharacters.includes(letter as KeyboardCharacter)
        )
    );
  }
}

export const configStore = new ConfigStore();
