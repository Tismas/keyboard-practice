import { makeAutoObservable } from "mobx";
import { FallingWord } from "../canvas/FallingWord";
import { randomChoice } from "../utils/array";
import { configStore } from "./configStore";
import { draw, update } from "../canvas/game";
import { KeyboardCharacter } from "../constants/characters";

export const fontSize = 20;

class GameStore {
  started = false;
  _ctx: CanvasRenderingContext2D | null = null;

  fallingWords: FallingWord[] = [];
  focusedWord: FallingWord | undefined = undefined;
  lastAddedWordAt = new Date();

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
    this.fallingWords.forEach((word) => word.handlePunishment());
  }

  clearFocusedWord() {
    this.focusedWord = undefined;
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
    this.focusedWord ||= this.fallingWords
      .toSorted((a, b) => b.position.y - a.position.y)
      .find((word) => word.textToType.startsWith(e.key));

    if (!this.focusedWord) {
      this.punishForInvalidButtonPress();
      return;
    }

    this.focusedWord.handleKey(e.key as KeyboardCharacter);
  }
}

export const gameStore = new GameStore();
