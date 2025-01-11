import { configStore } from "../stores/configStore";
import { gameStore } from "../stores/gameStore";

let lastUpdate = new Date();

export const draw = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  gameStore.fallingWords.forEach((word) => word.draw(ctx));
};

const handleWordAdding = (wordDeltaTime: number, timePerCharacter: number) => {
  const lastAddedWord = gameStore.fallingWords.at(-1);
  const enoughTimePassed =
    wordDeltaTime > timePerCharacter * (lastAddedWord?.word.length || 1);

  if (gameStore.fallingWords.length === 0 || enoughTimePassed) {
    gameStore.addWord();
  }
};

export const update = (ctx: CanvasRenderingContext2D) => {
  const now = new Date();
  const deltaTime = Number(now) - Number(lastUpdate);
  lastUpdate = new Date();
  const wordDeltaTime = Number(now) - Number(gameStore.lastAddedWordAt);
  const timePerCharacter = 60_000 / configStore.targetSpeed;

  gameStore.fallingWords.forEach((word) =>
    word.update(ctx, deltaTime, timePerCharacter)
  );
  gameStore.fallingWords = gameStore.fallingWords.filter((word) => {
    return !word.toRemove;
  });

  handleWordAdding(wordDeltaTime, timePerCharacter);
};
