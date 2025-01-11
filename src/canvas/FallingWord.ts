import { KeyboardCharacter } from "../constants/characters";
import { fontSize, gameStore } from "../stores/gameStore";
import { Vector2 } from "../utils/Vector2";

const punishTime = 500;

export class FallingWord {
  word: string;
  textToType: string;
  position: Vector2;
  typedText = "";
  speed = 1 / 4;
  toRemove = false;
  punishedAt: Date | null = null;
  typedColor: string;
  toTypeColor: string;

  constructor(ctx: CanvasRenderingContext2D, word: string) {
    this.word = word;
    this.textToType = word;

    const textWidth = ctx.measureText(word).width;
    this.position = new Vector2(
      Math.random() * (ctx.canvas.width - textWidth),
      0
    );

    this.typedColor = window
      .getComputedStyle(document.body)
      .getPropertyValue("--positive");
    this.toTypeColor = window
      .getComputedStyle(document.body)
      .getPropertyValue("--foreground");
  }

  draw(ctx: CanvasRenderingContext2D) {
    const wordWidth = ctx.measureText(this.word).width;

    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    if (this.punishedAt) {
      ctx.translate(wordWidth / 2, fontSize / 4);
      ctx.rotate((Math.random() - 0.5) * 0.5);
      ctx.translate(-wordWidth / 2, -fontSize / 4);

      const xTranslate = Math.random() * 15;
      const yTranslate = Math.random() * 15;
      ctx.translate(xTranslate, yTranslate);
    }

    this.drawText(ctx);

    ctx.restore();
  }

  drawText(ctx: CanvasRenderingContext2D) {
    const typedWidth = ctx.measureText(this.typedText).width;

    ctx.fillStyle = this.typedColor;
    ctx.fillText(this.typedText, 0, 0);

    if (this.punishedAt) {
      ctx.fillStyle = "#ff0000";
    } else {
      ctx.fillStyle = this.toTypeColor;
    }
    ctx.fillText(this.textToType, typedWidth, 0);
  }

  update(
    ctx: CanvasRenderingContext2D,
    deltaTime: number,
    timePerCharacter: number
  ) {
    const toTravel = window.innerHeight;
    const estimatedTime = timePerCharacter * this.word.length;
    const timeRatio = deltaTime / estimatedTime;

    let dx = Math.min(5, toTravel * timeRatio * this.speed);
    if (this.punishedAt) {
      dx *= 2;
    }
    this.position.y += dx;

    if (this.position.y > ctx.canvas.height + 40) {
      this.markToRemove();
    }
    if (Number(new Date()) - Number(this.punishedAt) > punishTime) {
      this.punishedAt = null;
    }
  }

  handlePunishment() {
    this.punishedAt = new Date();
  }

  markToRemove() {
    this.toRemove = true;

    if (this === gameStore.focusedWord) {
      gameStore.clearFocusedWord();
    }
  }

  handleKey(key: KeyboardCharacter) {
    if (this.textToType.startsWith(key)) {
      this.typedText += key;
      this.textToType = this.textToType.slice(1);
      if (this.textToType.length === 0) {
        this.markToRemove();
      }
    } else {
      gameStore.punishForInvalidButtonPress();
    }
  }
}
