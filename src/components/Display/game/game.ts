import { randomChoice, Vector2 } from "./utils";

let targetSpeed: number = 0;
let wordsPool: string[] = [];
let fallingWords: FallingWord[] = [];
let lastAddedWordAt = new Date();
let lastUpdate = new Date();

class FallingWord {
  word: string;
  textToType: string;
  position: Vector2;
  typedText = "";
  toRemove = false;
  speed = 1 / 4;

  constructor(ctx: CanvasRenderingContext2D, word: string) {
    this.word = word;
    this.textToType = word;

    const textWidth = ctx.measureText(word).width;
    this.position = new Vector2(
      Math.random() * (ctx.canvas.width - textWidth),
      -20
    );
  }

  draw(ctx: CanvasRenderingContext2D) {
    const typedWidth = ctx.measureText(this.typedText).width;
    ctx.fillStyle = window
      .getComputedStyle(document.body)
      .getPropertyValue("--positive");
    ctx.fillText(this.typedText, this.position.x, this.position.y);

    ctx.fillStyle = window
      .getComputedStyle(document.body)
      .getPropertyValue("--foreground");
    ctx.fillText(
      this.textToType,
      this.position.x + typedWidth,
      this.position.y
    );
  }

  update(
    ctx: CanvasRenderingContext2D,
    deltaTime: number,
    timePerCharacter: number
  ) {
    const toTravel = window.innerHeight;
    const estimatedTime = timePerCharacter * this.word.length;
    const timeRatio = deltaTime / estimatedTime;

    this.position.y += toTravel * timeRatio * this.speed;

    if (this.position.y > ctx.canvas.height + 40) {
      this.toRemove = true;
    }
  }
}

const draw = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  fallingWords.forEach((word) => word.draw(ctx));
};

const handleWordAdding = (
  ctx: CanvasRenderingContext2D,
  wordDeltaTime: number,
  timePerCharacter: number
) => {
  const lastAddedWord = fallingWords.at(-1);
  const enoughTimePassed =
    wordDeltaTime > timePerCharacter * (lastAddedWord?.word.length || 1);

  if (fallingWords.length === 0 || enoughTimePassed) {
    lastAddedWordAt = new Date();
    const word = randomChoice(wordsPool);
    fallingWords.push(new FallingWord(ctx, word));
  }
};

const update = (ctx: CanvasRenderingContext2D) => {
  const now = new Date();
  const deltaTime = Number(now) - Number(lastUpdate);
  lastUpdate = new Date();
  const wordDeltaTime = Number(now) - Number(lastAddedWordAt);
  const timePerCharacter = 60_000 / targetSpeed;

  fallingWords.forEach((word) => word.update(ctx, deltaTime, timePerCharacter));
  fallingWords = fallingWords.filter((word) => !word.toRemove);
  handleWordAdding(ctx, wordDeltaTime, timePerCharacter);
};

export const handleKeyDown = (e: KeyboardEvent) => {
  const lowestMatching = fallingWords
    .toSorted((a, b) => b.position.y - a.position.y)
    .find((word) => word.textToType.startsWith(e.key));

  if (lowestMatching) {
    lowestMatching.typedText += e.key;
    lowestMatching.textToType = lowestMatching.textToType.slice(1);
    if (lowestMatching.textToType.length === 0) lowestMatching.toRemove = true;
  }
};

export const updateGame = (
  ctx: CanvasRenderingContext2D,
  initialized: boolean,
  _targetSpeed: number,
  _wordsPool: string[]
) => {
  ctx.font = "20px Monospace";
  targetSpeed = _targetSpeed;
  wordsPool = _wordsPool;

  if (!initialized) {
    setInterval(() => {
      update(ctx);
      draw(ctx);
    }, 1000 / 60);
  }
};
