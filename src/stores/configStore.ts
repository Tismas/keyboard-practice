import { makeAutoObservable } from "mobx";
import { KeyboardCharacter } from "../constants/characters";
import { words } from "../constants/words";

class ConfigStore {
  targetSpeed = 30;
  unlockedCharacters: KeyboardCharacter[] = ["f", "j"];
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
  }

  setTargetSpeed(targetSpeed: number) {
    this.targetSpeed = targetSpeed;
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
