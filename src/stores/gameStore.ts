import { makeAutoObservable } from "mobx";
import { FallingWord } from "../canvas/FallingWord";
import { randomChoice } from "../utils/array";
import { configStore } from "./configStore";
import { draw, update } from "../canvas/game";
import { KeyboardCharacter } from "../constants/characters";
import { statsStore } from "./statsStore";

export const fontSize = 24;

class GameStore {
  started = false;
  _ctx: CanvasRenderingContext2D | null = null;

  fallingWords: FallingWord[] = [];
  focusedWord: FallingWord | undefined = undefined;
  lastAddedWordAt = new Date();
  currentSpeed = configStore.targetSpeed / 2;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get ctx() {
    if (!this._ctx) throw new Error("Game not initialized yet");
    return this._ctx;
  }
  get canvas() {
    return this.ctx.canvas;
  }

  start(ctx: CanvasRenderingContext2D) {
    if (this.started) return;
    this.started = true;
    this._ctx = ctx;

    this.initializeEvents();
    setInterval(() => {
      update(ctx);
      draw(ctx);
    }, 1000 / 60);
  }

  addWord() {
    this.lastAddedWordAt = new Date();
    const word = randomChoice(configStore.wordsPool);
    this.fallingWords.push(new FallingWord(this.ctx, word));
  }

  punishForInvalidButtonPress() {
    statsStore.setStreakWithoutMistake(0);
    if (this.focusedWord) {
      this.focusedWord.highlight();
    } else {
      this.fallingWords.forEach((word) => word.highlight());
    }
    this.fallingWords.forEach((word) => word.handlePunishment());
    this.lowerDifficulty(1);

    statsStore.setScore(statsStore.score - 10);
    statsStore.handleIncorrectlyTyped(
      this.focusedWord?.textToType[0] || this.getLowestWord().textToType[0]
    );
  }
  punishForMissedWord() {
    statsStore.setStreakWithoutMistake(0);
    gameStore.lowerDifficulty(2);
    statsStore.setScore(statsStore.score * 0.9);
  }

  calculateScore(completionSpeed: number, wordLength: number) {
    return (
      (Math.log(this.currentSpeed * wordLength * completionSpeed) || 0) *
      configStore.unlockedCharacters.length
    );
  }
  rewardCompletion(completionSpeed: number, wordLength: number) {
    statsStore.setScore(
      statsStore.score + this.calculateScore(completionSpeed, wordLength)
    );
    this.upDifficulty(
      Math.ceil(wordLength / 2) * (completionSpeed > 0.5 ? 1 : 0)
    );
  }

  clearFocusedWord() {
    this.focusedWord = undefined;
  }

  lowerDifficulty(value: number) {
    this.currentSpeed = Math.max(10, this.currentSpeed - value);
  }
  upDifficulty(value: number) {
    this.currentSpeed += value;
    if (this.currentSpeed >= configStore.targetSpeed) {
      this.currentSpeed /= 2;
      configStore.unlockNextCharacter();
    }
  }

  private getLowestWord() {
    return this.fallingWords.toSorted((a, b) => b.position.y - a.position.y)[0];
  }

  private initializeEvents() {
    window.addEventListener("resize", this.resizeCanvas);
    window.addEventListener("keydown", this.handleKeyDown);
    this.resizeCanvas();
  }

  private resizeCanvas() {
    const parent = this.canvas.parentElement;
    if (!parent) return;

    this.canvas.width = parent.clientWidth;
    this.canvas.height = parent.clientHeight;
    this.ctx.font = `${fontSize}px Monospace`;
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (["Shift", "Alt", "Control"].includes(e.key) || e.repeat) return;

    this.focusedWord ||= this.fallingWords
      .toSorted((a, b) => b.position.y - a.position.y)
      .find((word) => word.textToType.startsWith(e.key));
    statsStore.setStreakWithoutMistake(statsStore.streakWithoutMistake + 1);

    if (!this.focusedWord) {
      this.punishForInvalidButtonPress();
      return;
    }

    this.focusedWord.handleKey(e.key as KeyboardCharacter);
  }
}

export const gameStore = new GameStore();
